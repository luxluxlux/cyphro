# DevOps Production Runbook

This document provides a step-by-step guide to prepare a server, deploy the application, and maintain it in production.

**All commands are assumed to be run as a non-root user with sudo privileges unless stated otherwise.**

# 1. Server Preparation

## 1.1 Initial Setup

- Change default password:

  ```bash
  passwd
  ```

- Update system packages:

  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- Reboot:

  ```bash
  sudo reboot
  ```

## 1.2 SSH Hardening

- Generate SSH key (local machine):

  ```bash
  ssh-keygen
  ```

- Copy public key:

  ```bash
  type $env:USERPROFILE\.ssh\id_ed25519.pub
  ```

- Paste key on server:

  ```bash
  mkdir -p ~/.ssh
  nano ~/.ssh/authorized_keys
  ```

- Set correct permissions:

  ```bash
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/authorized_keys
  ```

- Reconnect using SSH key.

- Disable password authentication:

  ```bash
  sudo nano /etc/ssh/sshd_config
  ```

  Set:

  ```
  PasswordAuthentication no
  PermitRootLogin no
  ```

- Restart SSH service:

  ```bash
  sudo systemctl restart ssh
  ```

- Check status:

  ```bash
  sudo systemctl status ssh
  ```

## 1.3 Firewall (UFW)

- Install UFW:

  ```bash
  sudo apt install ufw -y
  ```

- Configure rules:

  ```bash
  sudo ufw default deny incoming
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  ```

- Enable firewall:

  ```bash
  sudo ufw enable
  ```

- Check status:

  ```bash
  sudo ufw status
  ```

## 1.4 Fail2Ban Protection

- Install Fail2Ban:

  ```bash
  sudo apt install fail2ban -y
  ```

- Configure:

  ```bash
  sudo nano /etc/fail2ban/jail.local
  ```

  Set:

  ```
  [sshd]
  enabled = true
  maxretry = 5
  bantime = 3600
  ```

- Enable and start service:

  ```bash
  sudo systemctl enable fail2ban
  sudo systemctl start fail2ban
  ```

- Check status:

  ```bash
  sudo systemctl status fail2ban
  ```

## 1.5 Automatic Updates

- Install Unattended Upgrades:

  ```bash
  sudo apt install unattended-upgrades -y
  ```

- Configure:

  ```bash
  sudo dpkg-reconfigure --priority=low unattended-upgrades
  ```

## 1.6 Monitoring (Netdata)

- Install Netdata:

  ```bash
  sudo bash <(curl -Ss https://get.netdata.cloud/kickstart.sh)
  ```

- Disable cloud:

  ```bash
  sudo nano /etc/netdata/netdata.conf
  ```

  Set:

  ```
  [global]
      enable cloud = no
  ```

- Start service:

  ```bash
  sudo systemctl restart netdata
  ```

- Check access (local machine):

  ```bash
  ssh -L 19999:localhost:19999 user@IP
  ```

  Open [http://localhost:19999](http://localhost:19999).

# 2. Application Deployment

## 2.1 Build Application

- Go to the client directory (local machine):

  ```bash
  cd client
  ```

- Install dependencies:

  ```bash
  npm install
  ```

- Build static files:

  ```bash
  npm run build
  ```

## 2.2 Upload Static Files

- Create directory on server:

  ```bash
  sudo mkdir -p /var/www/cyphro
  ```

- Upload build output to `/var/www/cyphro`.

- Set ownership and permissions:

  ```bash
  sudo chown -R www-data:www-data /var/www/cyphro
  sudo chmod -R 755 /var/www/cyphro
  ```

## 2.3 Install and Enable Nginx

- Install Nginx:

  ```bash
  sudo apt install nginx -y
  ```

- Enable and start service:

  ```bash
  sudo systemctl enable nginx
  sudo systemctl start nginx
  ```

- Check status:

  ```bash
  sudo systemctl status nginx
  ```

## 2.4 Configure Nginx Structure

- Upload configurations according to the structure:

  ```
  /etc/nginx/
  ├── sites-available/
  │   └── cyphro         ← prod.conf
  ├── common/
  │   └── app.conf       ← app.conf
  └── conf.d/
      └── gzip.conf      ← gzip.conf
  ```

- Create symlink:

  ```bash
  sudo ln -s /etc/nginx/sites-available/cyphro /etc/nginx/sites-enabled/
  ```

- Remove default config from `sites-available` and `sites-enabled` if present.

- Remove duplicate gzip settings if exists:

  ```bash
  sudo nano /etc/nginx/nginx.conf
  ```

## 2.5 Enable HTTPS

- Install Certbot:

  ```bash
  sudo apt install certbot python3-certbot-nginx -y
  ```

- Issue SSL certificate:

  ```bash
  sudo certbot --nginx -d <domain>
  ```

- Verify certificate renewal

  ```bash
  sudo certbot renew --dry-run
  ```

## 2.6 Add Origin Protection

Origin protection is used to prevent direct access to the origin server, ensuring that all traffic to the backend is routed only through the CDN. This is typically enabled after CDN and SSL setup is fully verified in production.

It helps reduce unauthorized access attempts, hides the origin server from direct exposure, and enforces that only trusted CDN requests can reach the application.

- Uncomment in `/etc/nginx/sites-available/cyphro`:

  ```nginx
  if ($http_x_origin_auth != "secret-token") {
    return 403;
  }
  ```

- Replace `secret-token` with your own token.

## 2.7 Validate and Reload

- Check configuration:

  ```bash
  sudo nginx -t
  ```

- Reload configuration softly:

  ```bash
  sudo systemctl reload nginx
  ```

- Check status:

  ```bash
  sudo systemctl status nginx
  curl http://localhost/health
  ```

## 2.8 Disable Indexing (Staging Only)

If it is a staging environment, we want to disable indexing. **Don't forget to enable indexing in production!**

- Disable index in robots.txt:

  ```
  User-agent: *
  Disallow: /
  ```

- Disable index in HTML header:

  ```html
  <meta name="robots" content="noindex, nofollow" />
  ```

- Disable index in Nginx config:

  ```nginx
  add_header X-Robots-Tag "noindex, nofollow" always;
  ```

- Check configuration:

  ```bash
  sudo nginx -t
  ```

- Reload configuration softly:

  ```bash
  sudo systemctl reload nginx
  ```

- Check status:

  ```bash
  sudo systemctl status nginx
  curl http://localhost/health
  ```

# 3. Operations & Maintenance

## 3.1 Logs Monitoring

- Check for last log entries:

  ```bash
  sudo tail -f /var/log/auth.log
  ```

- Check for failed logins:

  ```bash
  grep "Failed" /var/log/auth.log
  ```

## 3.2 Security Monitoring

Check for blocked IP addresses:

```bash
sudo fail2ban-client status sshd
```

## 3.3 System Monitoring

- Tunnel SSH connection (local machine):

  ```bash
  ssh -L 19999:localhost:19999 user@IP
  ```

- Open [http://localhost:19999](http://localhost:19999).

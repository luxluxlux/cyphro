import { Helmet } from 'react-helmet-async';
import { Link } from '@mui/material';
import { APP_COUNTRY, APP_EMAIL, APP_NAME } from 'utils/constants';
import { WINDOW_DATA, WINDOW } from 'components/WindowManager';
import { Header } from 'components/Page';

// TODO: Add anchors to sections
/**
 * The Privacy Policy of the application.
 * @return Page content.
 */
const PrivacyPolicy = () => (
    <>
        <Helmet>
            <title>{APP_NAME} | Privacy Policy</title>
        </Helmet>
        <Header
            path={`?popup=${WINDOW_DATA[WINDOW.PRIVACY_POLICY].path}`}
            metaTitle={`${APP_NAME} Privacy Policy - How We Process Your Data`}
            metaDescription={`Learn how  ${APP_NAME} handles, safeguards, and manages your personal information. Read about data usage, security measures, sharing practices, your rights, and how to contact us.`}
            metaKeywords={`privacy nolicy, ${APP_NAME}, privacy notice, personal data, data protection, data processing, user rights, information security, open source, file encryption, file encoding, file disguise`}
            ogTitle={`${APP_NAME} — Privacy Policy`}
            ogDescription="Learn how we handle, safeguard, and manage your personal information. Read about data usage, security measures, sharing practices, your rights, and how to contact us."
        />
        <div>
            <h2>Privacy Policy</h2>
            <p>
                <strong>Last updated January 1, 2026</strong>
            </p>
            <p>
                This Privacy Policy for {APP_NAME} Project Team (&quot;<strong>we</strong>&quot;,
                &quot;<strong>us</strong>&quot;, &quot;<strong>our</strong>&quot;), describes how
                and why we might access, collect, store, use, and/or share (&quot;
                <strong>process</strong>&quot;) your personal information when you use our services
                (&quot;<strong>Services</strong>&quot;).
            </p>
            <p>
                <strong>Questions or concerns?</strong> Reading this Privacy Policy will help you
                understand your privacy rights and choices. We are responsible for making decisions
                about how your personal information is processed. If you do not agree with our
                policies and practices, please do not use our Services.
            </p>
            <h3>1. What Information Do We Collect?</h3>
            <p>
                We automatically collect minimal technical information when you visit or use the
                Services. This information does not reveal your specific identity (like your name or
                contact information) but may include device and usage information, such as your IP
                address, browser and device characteristics, operating system, language preferences,
                referring URLs, device name, information about how and when you use our Services,
                and other technical information. This information is necessary to maintain the
                security and operation of our Services, and for internal analytics. We do not
                collect, store, or access any files or other content that you process through the
                Services.
            </p>
            <h3>2. How Do We Process Your Information?</h3>
            <p>
                We process your information to provide, improve, and administer our Services, for
                security and fraud prevention, and to comply with law.
            </p>
            <h3>3. When and With Whom Do We Share Your Personal Information?</h3>
            <p>We may need to share your personal information in the following situations:</p>
            <ul>
                <li>
                    <strong>Project Continuity.</strong> If the Services or their maintenance are
                    transferred, handed over, or continued by another individual or non-commercial
                    organization, your personal information may be shared solely to the extent
                    necessary to ensure the continued operation and maintenance of the Services.
                </li>
                <li>
                    <strong>Project Contributors.</strong> We may share limited personal information
                    with contributors who help develop, operate, or support the Services, but only
                    where such access is necessary and subject to obligations consistent with this
                    Privacy Policy.
                </li>
                <li>
                    <strong>Third-Party Infrastructure Providers.</strong> If we rely on third-party
                    services to operate technical aspects of the Services (such as hosting or basic
                    analytics), we may share minimal technical information (e.g., IP address, device
                    and browser information, and usage metrics) with those providers solely for the
                    purpose of providing such services and in accordance with this Privacy Policy.
                    No files or content processed through the Services are shared with or accessible
                    to third-party providers. Such providers act as data processors and are
                    contractually required to process personal information only on our instructions.
                </li>
            </ul>
            <h3>4. Do We Use Cookies and Other Tracking Technologies?</h3>
            <p>
                We don&apos;t use cookies or similar tracking technologies. Any analytics used are
                cookie-less and rely only on minimal technical data.
            </p>
            <h3>5. Is Your Information Transferred Internationally?</h3>
            <p>
                Our servers are located in {APP_COUNTRY}. Regardless of your location, please be
                aware that limited technical information (e.g., IP address, device and browser
                information, usage metrics) may be transferred to, stored by, and processed by us in
                our facilities and in the facilities of the third parties with whom we may share
                this information (see &quot;When and with whom do we share your personal
                information?&quot; above), including facilities in other countries solely for the
                purpose of operating the Services. No files or other content processed through the
                Services are transferred or accessible to these third parties.
            </p>
            <p>
                If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or
                Switzerland, then these countries may not necessarily have data protection laws or
                other similar laws as comprehensive as those in your country. However, we will take
                all necessary measures to protect your information in accordance with this Privacy
                Policy and applicable law.{' '}
            </p>
            <h3>6. How Long Do We Keep Your Information?</h3>
            <p>
                We will only keep your personal information for as long as it is necessary for the
                purposes set out in this Privacy Policy, unless a longer retention period is
                required or permitted by law (such as legal requirements).
            </p>
            <p>
                When we have no ongoing need to process your personal information, we will delete
                such information. This typically includes only limited technical logs required for
                security or operational purposes.
            </p>
            <h3>7. Do We Collect Information from Minors?</h3>
            <p>
                We do not knowingly collect data from children under 18 years of age. By using the
                Services, you represent that you are at least 18 or that you are the parent or
                guardian of such a minor and consent to such minor dependent&apos;s use of the
                Services.
            </p>
            <h3>8. What Are Your Privacy Rights?</h3>
            <p>
                <strong>Withdrawing your consent:</strong> If we are relying on your consent to
                process your personal information, which may be express and/or implied consent
                depending on the applicable law, you have the right to withdraw your consent at any
                time. You can withdraw your consent by contacting us using the contact details
                provided in the section &quot;How can you contact us?&quot; below.
            </p>
            <p>
                However, please note that this will not affect the lawfulness of the processing
                before its withdrawal nor, when applicable law allows, will it affect the processing
                of your personal information conducted in reliance on lawful processing grounds
                other than consent.
            </p>
            <h3>9. Controls for Do-not-track Features</h3>
            <p>
                Most web browsers and some mobile operating systems and mobile applications include
                a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your
                privacy preference not to have data about your online browsing activities monitored
                and collected. At this stage, no uniform technology standard for recognizing and
                implementing DNT signals has been finalized. As such, we do not currently respond to
                DNT browser signals or any other mechanism that automatically communicates your
                choice not to be tracked online. If a standard for online tracking is adopted that
                we must follow in the future, we will inform you about that practice in a revised
                version of this Privacy Policy.
            </p>
            <h3>10. Do We Make Updates to This Notice?</h3>
            <p>
                We may update this Privacy Policy from time to time. The updated version will be
                indicated by an updated date at the top of this Privacy Policy. We encourage you to
                review this Privacy Policy frequently to be informed of how we are protecting your
                information.
            </p>
            <h3>11. How Can You Review, Update, or Delete the Data We Collect From You?</h3>
            <p>
                Based on the applicable laws of your country, you may have the right to request
                access to the personal information we collect from you, details about how we have
                processed it, or delete your personal information. You may also have the right to
                withdraw your consent to our processing of your personal information. These rights
                may be limited in some circumstances by applicable law. To request to review or
                delete your personal information, please contact us using the contact information
                provided in the section &quot;How can you contact us?&quot; below.
            </p>
            <h3>12. How Can You Contact Us?</h3>
            <p>
                If you have questions or comments about this notice, you may contact us by email at{' '}
                <Link href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</Link>.
            </p>
        </div>
    </>
);

PrivacyPolicy.displayName = 'PrivacyPolicy';

export default PrivacyPolicy;

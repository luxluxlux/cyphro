import { useCallback, useContext, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MuiLink from '@mui/material/Link';
import {
    APP_COUNTRY,
    APP_EMAIL,
    APP_NAME,
    APP_URL,
    GITHUB_URL,
    STAGE,
    STAGE_DATA,
} from 'utils/constants';
import { WINDOW_DATA, WINDOW, WindowManagerContext } from 'components/WindowManager';

// TODO: Add anchors to sections
/**
 * The Terms of Use of the application.
 * @return Page content.
 */
const TermsOfUse = () => {
    const windowContext = useContext(WindowManagerContext);

    const handleClickPrivacyPolicy = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            // Prevent window from being closed
            event.stopPropagation();
            windowContext.open(WINDOW.PRIVACY_POLICY);
        },
        [windowContext.open]
    );

    return (
        <>
            <Helmet>
                <title>Terms of Use — User Agreement and Guidelines | {APP_NAME}</title>
                <link
                    rel="canonical"
                    href={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.TERMS_OF_USE].path}`}
                />
                <meta
                    name="description"
                    content={`Read the ${APP_NAME} Terms of Use to understand your rights and responsibilities when using this open-source file encoding tool. Learn about privacy, permitted usage, and legal compliance.`}
                />
                <meta
                    name="keywords"
                    content={`terms of use, ${APP_NAME}, terms and conditions, privacy policy, user agreement, legal notice, disclaimer, open source, data privacy, password protection, file encryption, file encoding, file disguise`}
                />
                <meta property="og:title" content={`${APP_NAME} — Terms of Use`} />
                <meta
                    property="og:description"
                    content="Read the Terms of Use to understand your rights and responsibilities when using this open-source file encoding tool. Learn about privacy, permitted usage, and legal compliance."
                />
                <meta
                    property="og:url"
                    content={`${APP_URL}?popup=${WINDOW_DATA[WINDOW.TERMS_OF_USE].path}`}
                />
                <meta name="twitter:title" content={`${APP_NAME} — Terms of Use`} />
                <meta
                    name="twitter:description"
                    content="Read the Terms of Use to understand your rights and responsibilities when using this open-source file encoding tool. Learn about privacy, permitted usage, and legal compliance."
                />
            </Helmet>
            <div>
                <h2>Terms of Use</h2>
                <p>
                    <strong>Last updated January 1, 2026</strong>
                </p>
                <p>
                    We are {APP_NAME} Project Team (&quot;<strong>we</strong>&quot;, &quot;
                    <strong>us</strong>&quot;, &quot;<strong>our</strong>&quot;).
                </p>
                <p>
                    We operate the website{' '}
                    <MuiLink component={RouterLink} to={STAGE_DATA[STAGE.UPLOAD].path}>
                        http://www.cyphro.io
                    </MuiLink>{' '}
                    (the &quot;Site&quot;) as well as any other related products and services that
                    refer or link to these terms of use (the &quot;Terms of Use&quot;)
                    (collectively, the &quot;Services&quot;).
                </p>
                <p>
                    We provide a privacy-first web solution that helps users protect their files
                    from fraudsters and data leaks through client-side processing.{' '}
                </p>
                <p>
                    You can contact us by email at{' '}
                    <MuiLink href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</MuiLink>.
                </p>
                <p>
                    These Terms of Use constitute a legally binding agreement made between you,
                    whether personally or on behalf of an entity (&quot;you&quot;), and {APP_NAME}{' '}
                    Project Team, concerning your access to and use of the Services. You agree that
                    by accessing the Services, you have read, understood, and agreed to be bound by
                    all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE,
                    THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
                    DISCONTINUE USE IMMEDIATELY.{' '}
                </p>
                <p>
                    Supplemental terms and conditions or documents that may be posted on the
                    Services from time to time are hereby expressly incorporated herein by
                    reference. We reserve the right, in our sole discretion, to make changes or
                    modifications to these Terms of Use from time to time. We will alert you about
                    any changes by updating the &quot;Last updated&quot; date of these Terms of Use,
                    and you waive any right to receive specific notice of each such change. It is
                    your responsibility to periodically review these Terms of Use to stay informed
                    of updates. You will be subject to, and will be deemed to have been made aware
                    of and to have accepted, the changes in any revised Terms of Use by your
                    continued use of the Services after the date such revised Terms of Use are
                    posted.
                </p>
                <p>
                    All users who are minors in the jurisdiction in which they reside (generally
                    under the age of 18) must have the permission of, and be directly supervised by,
                    their parent or guardian to use the Services. If you are a minor, you must have
                    your parent or guardian read and agree to these Terms of Use prior to you using
                    the Services.{' '}
                </p>
                <h3>1. Our Services</h3>
                <p>
                    The information provided when using the Services is not intended for
                    distribution to or use by any person or entity in any jurisdiction or country
                    where such distribution or use would be contrary to law or regulation or which
                    would subject us to any registration requirement within such jurisdiction or
                    country. Accordingly, those persons who choose to access the Services from other
                    locations do so on their own initiative and are solely responsible for
                    compliance with local laws, if and to the extent local laws are applicable.
                </p>
                <p>
                    All processing of files or other data through the Services occurs entirely on
                    the user&apos;s device. We do not receive, store, transmit, back up, or have
                    access to any such files or data.
                </p>
                <h3>2. Intellectual Property Rights</h3>
                <h4>Our intellectual property</h4>
                <p>
                    The{' '}
                    <MuiLink href={GITHUB_URL} target="_blank" rel="noopener">
                        source code
                    </MuiLink>{' '}
                    of the Services is released under the MIT License. You may use, copy, modify,
                    merge, publish, distribute, sublicense, and/or sell copies of the source code,
                    as permitted by the terms of the MIT License. A{' '}
                    <MuiLink
                        href={`${GITHUB_URL}/blob/main/LICENSE.md`}
                        target="_blank"
                        rel="noopener"
                    >
                        copy of the license
                    </MuiLink>{' '}
                    is included within the project repository and applies to all code files unless
                    stated otherwise.
                </p>
                <p>
                    All non-code elements of the Services — including, but not limited to, website
                    design, branding assets, visual media, text content, and other materials not
                    explicitly distributed under the MIT License (collectively, the
                    &quot;Content&quot;), as well as all trademarks, service marks, logos, and
                    related brand identifiers (collectively, the &quot;Marks&quot;) — remain the
                    sole property of us or our licensors.
                </p>
                <p>
                    Such Content and Marks are protected by copyright, trademark, and other
                    applicable intellectual property laws. Except where explicitly permitted by us,
                    you may not use, reproduce, or distribute the Content or Marks for any purpose,
                    including commercial use.
                </p>
                <p>
                    While the source code is freely available under the MIT License, all other
                    non-code aspects of the Services are provided “AS IS” for your personal,
                    non-commercial use only.
                </p>
                <h4>Your use of our Services</h4>
                <p>
                    Subject to your compliance with these Terms of Use, including the
                    &quot;Prohibited activities&quot; section below, we grant you a non-exclusive,
                    non-transferable, revocable license to:
                </p>
                <ul>
                    <li>access the Services; and</li>
                    <li>
                        download or print a copy of any portion of the non-code Content to which you
                        have properly gained access,
                    </li>
                </ul>
                <p>solely for your personal, non-commercial use.</p>
                <p>
                    The source code of the Services is licensed separately under the MIT License and
                    may be used, modified, and distributed in accordance with that license. The
                    permissions and restrictions in this section apply only to the non-code Content
                    and do not limit your rights under the MIT License.
                </p>
                <p>
                    Except as set out in this section or elsewhere in our Terms of Use, no part of
                    the Services and no non-code Content or Marks may be copied, reproduced,
                    aggregated, republished, uploaded, posted, publicly displayed, encoded,
                    translated, transmitted, distributed, sold, licensed, or otherwise exploited for
                    any commercial purpose whatsoever, without our express prior written permission.
                </p>
                <p>
                    If you wish to make any use of the non-code portions of the Services, Content,
                    or Marks other than as set out in this section or elsewhere in our Terms of Use,
                    please address your request by using the contact details provided in the section
                    &quot;Contact us&quot; below. If we ever grant you the permission to post,
                    reproduce, or publicly display any part of our Services or Content, you must
                    identify us as the owners or licensors of the Services, Content, or Marks and
                    ensure that any copyright or proprietary notice appears or is visible on
                    posting, reproducing, or displaying our Content.
                </p>
                <p>
                    We reserve all rights not expressly granted to you in and to the Services,
                    Content, and Marks.
                </p>
                <p>
                    Any breach of these Intellectual Property Rights will constitute a material
                    breach of our Terms of Use and your right to use our Services will terminate
                    immediately.
                </p>
                <h4>Your submissions</h4>
                <p>
                    If you voluntarily send us feedback, suggestions, or other communications
                    related to the Services (“Submissions”), you understand that such Submissions
                    are not confidential. You grant us a non-exclusive, perpetual, royalty-free
                    right to use such Submissions for improving or operating the Services. This
                    section does not apply to files you process through the Services, as all file
                    processing occurs entirely on your device and no files are uploaded to our
                    servers.{' '}
                </p>
                <h3>3. User Representations</h3>
                <p>
                    By using the Services, you represent and warrant that: (1) you have the legal
                    capacity and you agree to comply with these Terms of Use; (2) you are not a
                    minor in the jurisdiction in which you reside, or if a minor, you have received
                    parental permission to use the Services; (3) you will not access the Services
                    through automated or non-human means, whether through a bot, script or
                    otherwise; (4) you will not use the Services for any illegal or unauthorized
                    purpose; and (5) your use of the Services will not violate any applicable law or
                    regulation.{' '}
                </p>
                <h3>4. Prohibited Activities</h3>
                <p>
                    You may not access or use the Services for any purpose other than that for which
                    we make the Services available.
                </p>
                <p>As a user of the Services, you agree not to:</p>
                <ul>
                    <li>
                        Systematically retrieve data or other content from the Services to create or
                        compile, directly or indirectly, a collection, compilation, database, or
                        directory without written permission from us, except for any code or assets
                        that we explicitly provide under an open-source license (such as MIT), which
                        you may use according to the terms of that license.
                    </li>
                    <li>
                        Circumvent, disable, or otherwise interfere with security-related features
                        of the Services, including features that prevent or restrict the use or
                        copying of any non-code Content or enforce limitations on the use of the
                        Services and/or the non-code Content contained therein.{' '}
                    </li>
                    <li>
                        Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
                        Services.
                    </li>
                    <li>
                        Make improper use of our contact channels, including submitting knowingly
                        false reports of abuse or misconduct.
                    </li>
                    <li>
                        Use the Services in a manner inconsistent with any applicable laws or
                        regulations.
                    </li>
                    <li>
                        Engage in framing or embedding of the Services in a manner that misleads or
                        deceives users.
                    </li>
                    <li>
                        Upload (or attempt to upload) viruses, Trojan horses, or other material that
                        interferes with any party&apos;s uninterrupted use and enjoyment of the
                        Services or modifies, impairs, disrupts, alters, or interferes with the use,
                        features, functions, operation, or maintenance of the Services.
                    </li>
                    <li>
                        Engage in any automated use of the system that may impair or disrupt the
                        normal functioning of the Services, including harmful scripts, bots, or
                        data-mining tools.
                    </li>
                    <li>
                        Delete the copyright or other proprietary rights notice from any non-code
                        Content.
                    </li>
                    <li>
                        Attempt to introduce into the Services any malicious, unauthorized, or
                        hidden information collection, tracking, or transmission mechanisms.
                    </li>
                    <li>
                        Interfere with, disrupt, or create an undue burden on the Services or the
                        networks or services connected to the Services.
                    </li>
                    <li>
                        Harass, annoy, intimidate, or threaten any of our members or contributors
                        engaged in maintaining or supporting the Services.
                    </li>
                    <li>
                        Attempt to bypass any measures of the Services designed to prevent or
                        restrict access to the Services, or any portion of the Services.
                    </li>
                </ul>
                <h3>5. Third-party Websites and Content</h3>
                <p>
                    The Services may contain (or you may be sent via the Site or App) links to other
                    websites (&quot;Third-Party Websites&quot;) as well as articles, photographs,
                    text, graphics, pictures, designs, music, sound, video, information,
                    applications, software, and other content or items belonging to or originating
                    from third parties (&quot;Third-Party Content&quot;). Such Third-Party Websites
                    and Third-Party Content are not investigated, monitored, or checked for
                    accuracy, appropriateness, or completeness by us, and we are not responsible for
                    any Third-Party Websites accessed through the Services or any Third-Party
                    Content posted on, available through, or installed from the Services, including
                    the content, accuracy, offensiveness, opinions, reliability, privacy practices,
                    or other policies of or contained in the Third-Party Websites or the Third-Party
                    Content. Inclusion of, linking to, or permitting the use or installation of any
                    Third-Party Websites or any Third-Party Content does not imply approval or
                    endorsement thereof by us. If you decide to leave the Services and access the
                    Third-Party Websites or to use or install any Third-Party Content, you do so at
                    your own risk, and you should be aware these Terms of Use no longer govern. You
                    should review the applicable terms and policies, including privacy and data
                    gathering practices, of any website to which you navigate from the Services or
                    relating to any applications you use or install from the Services. Any purchases
                    you make through Third-Party Websites will be through other websites and from
                    other companies, and we take no responsibility whatsoever in relation to such
                    purchases which are exclusively between you and the applicable third party. You
                    agree and acknowledge that we do not endorse the products or services offered on
                    Third-Party Websites and you shall hold us blameless from any harm caused by
                    your purchase of such products or services. Additionally, you shall hold us
                    blameless from any losses sustained by you or harm caused to you relating to or
                    resulting in any way from any Third-Party Content or any contact with
                    Third-Party Websites.
                </p>
                <h3>6. Services Management</h3>
                <p>
                    We reserve the right, but not the obligation, to: (1) monitor the Services for
                    violations of these Terms of Use, solely through limited technical and
                    operational data; (2) take appropriate legal action against anyone who, in our
                    sole discretion, violates the law or these Terms of Use, including without
                    limitation, reporting such user to law enforcement authorities; (3) in our sole
                    discretion and without limitation, refuse, restrict access to, limit the
                    availability of, or disable (to the extent technologically feasible) any portion
                    of the Services; and (4) otherwise manage the Services in a manner designed to
                    protect our rights and property and to facilitate the proper functioning of the
                    Services.
                </p>
                <h3>7. Privacy Policy</h3>
                <p>
                    We care about data privacy and security. By using the Services, you agree to be
                    bound by our{' '}
                    <MuiLink component={'button'} onClick={handleClickPrivacyPolicy}>
                        Privacy Policy
                    </MuiLink>{' '}
                    posted on the Services, which is incorporated into these Terms of Use. Please be
                    advised the Services are hosted in {APP_COUNTRY}. If you access the Services
                    from any other region of the world with laws or other requirements governing
                    personal data collection, use, or disclosure that differ from applicable laws in
                    {APP_COUNTRY}, then through your continued use of the Services, you are
                    transferring limited technical data to {APP_COUNTRY}, and you expressly consent
                    to have your data transferred to and processed in {APP_COUNTRY}.
                </p>
                <h3>8. Term and Termination</h3>
                <p>
                    These Terms of Use shall remain in full force and effect while you use the
                    Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE
                    THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY
                    ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO
                    ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR
                    BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF
                    USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                    PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR INFORMATION THAT YOU
                    POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                </p>
                <p>
                    We reserve the right to take appropriate legal action in the event of violations
                    of these Terms of Use, including without limitation pursuing civil, criminal,
                    and injunctive redress.
                </p>
                <h3>9. Modifications and Interruptions</h3>
                <p>
                    We reserve the right to change, modify, or remove the contents of the Services
                    at any time or for any reason at our sole discretion without notice. However, we
                    have no obligation to update any information on our Services. We will not be
                    liable to you or any third party for any modification, suspension, or
                    discontinuance of the Services.
                </p>
                <p>
                    We cannot guarantee the Services will be available at all times. We may
                    experience hardware, software, or other problems or need to perform maintenance
                    related to the Services, resulting in interruptions, delays, or errors. We
                    reserve the right to change, revise, update, suspend, discontinue, or otherwise
                    modify the Services at any time or for any reason without notice to you. You
                    agree that we have no liability whatsoever for any loss, damage, or
                    inconvenience caused by your inability to access or use the Services during any
                    downtime or discontinuance of the Services. Nothing in these Terms of Use will
                    be construed to obligate us to maintain and support the Services or to supply
                    any corrections, updates, or releases in connection therewith.
                </p>
                <h3>10. Dispute Resolution</h3>
                <p>
                    If you have any complaints or concerns about the Services, you may contact us
                    directly. For EU residents, the European Commission provides an{' '}
                    <MuiLink
                        href="https://ec.europa.eu/consumers/odr"
                        target="_blank"
                        rel="noopener"
                    >
                        online dispute resolution platform
                    </MuiLink>
                    , which you can also access.
                </p>
                <h3>11. Corrections</h3>
                <p>
                    There may be information on the Services that contains typographical errors,
                    inaccuracies, or omissions, including descriptions, availability, and various
                    other information. We reserve the right to correct any errors, inaccuracies, or
                    omissions and to change or update the information on the Services at any time,
                    without prior notice.
                </p>
                <h3>12. Disclaimer</h3>
                <p>
                    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT
                    YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT
                    PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION
                    WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE
                    IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                    NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                    COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY WEBSITES LINKED
                    TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1)
                    ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY
                    OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND
                    USE OF THE SERVICES, (3) FILES OR OTHER DATA PROCESSED THROUGH THE SERVICES THAT
                    REMAIN ON YOUR DEVICE AND WE DO NOT STORE, BACK UP, OR ACCESS THEM, (4) ANY
                    UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL LIMITED
                    TECHNICAL INFORMATION STORED THEREIN, (5) ANY INTERRUPTION OR CESSATION OF
                    TRANSMISSION TO OR FROM THE SERVICES, (6) ANY BUGS, VIRUSES, TROJAN HORSES, OR
                    THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY,
                    AND/OR (7) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS
                    OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
                    TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES.
                </p>
                <h3>13. Limitations of Liability</h3>
                <p>
                    IN NO EVENT WILL WE OR OUR CONTRIBUTORS BE LIABLE TO YOU OR ANY THIRD PARTY FOR
                    ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                    DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES
                    ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
                    POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED
                    HEREIN, TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL LIABILITY FOR
                    ANY DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES. CERTAIN US
                    STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES
                    OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU,
                    SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND
                    YOU MAY HAVE ADDITIONAL RIGHTS.
                </p>
                <h3>14. Indemnification</h3>
                <p>
                    You agree to defend, indemnify, and hold us harmless, including our members and
                    contributors, from and against any loss, damage, liability, claim, or demand,
                    including reasonable attorneys&apos; fees and expenses, made by any third party
                    due to or arising out of: (1) use of the Services; (2) breach of these Terms of
                    Use; (3) any breach of your representations and warranties set forth in these
                    Terms of Use; or (4) your violation of the rights of a third party, including
                    but not limited to intellectual property rights. Notwithstanding the foregoing,
                    we reserve the right to request that you cooperate, at your expense, in the
                    defense of any claim subject to this indemnification. We will use reasonable
                    efforts to notify you of any such claim, action, or proceeding which is subject
                    to this indemnification upon becoming aware of it.
                </p>
                <h3>15. User Data</h3>
                <p>
                    We do not store, back up, or have access to any content or data processed
                    through the Services. All content and data processed by the Services remain
                    entirely on the user&apos;s device. We may retain limited technical or
                    operational data, such as usage statistics, as described in the{' '}
                    <MuiLink component={'button'} onClick={handleClickPrivacyPolicy}>
                        Privacy Policy
                    </MuiLink>
                    .
                </p>
                <h3>16. Electronic Communications, Transactions, and Signatures</h3>
                <p>
                    You agree that any notices or communications related to the Services may be
                    provided electronically, including through updates posted on the Services or via
                    email, and that such electronic communications satisfy any legal requirements
                    for written communication.
                </p>
                <h3>17. Miscellaneous</h3>
                <p>
                    These Terms of Use and any policies or operating rules posted by us on the
                    Services or in respect to the Services constitute the entire agreement and
                    understanding between you and us. Our failure to exercise or enforce any right
                    or provision of these Terms of Use shall not operate as a waiver of such right
                    or provision. These Terms of Use operate to the fullest extent permissible by
                    law. We may transfer or delegate the maintenance or development of the Services
                    to others at any time. We shall not be responsible or liable for any loss,
                    damage, delay, or failure to act caused by any cause beyond our reasonable
                    control. If any provision or part of a provision of these Terms of Use is
                    determined to be unlawful, void, or unenforceable, that provision or part of the
                    provision is deemed severable from these Terms of Use and does not affect the
                    validity and enforceability of any remaining provisions. There is no joint
                    venture, partnership, employment or agency relationship created between you and
                    us as a result of these Terms of Use or use of the Services. You agree that
                    these Terms of Use will not be construed against us by virtue of having drafted
                    them.
                </p>
                <h3>18. Contact Us</h3>
                <p>
                    In order to resolve a complaint regarding the Services or to receive further
                    information regarding use of the Services, please contact us by email at{' '}
                    <MuiLink href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</MuiLink>.
                </p>
            </div>
        </>
    );
};

TermsOfUse.displayName = 'TermsOfUse';

export default TermsOfUse;

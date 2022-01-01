import React from 'react';
import Layout from '../../Core/Layout/Layout';

export default function IntellectualPropertyPolicy() {
  return (
    <>
      <Layout>
        <div className="terms-wrapper">
          <div
            className="terms-banner"
            style={{
              backgroundImage: `url(${require('../../../assets/images/Term.png')})`,
            }}>
            <h2 className="t-title">Intellectual Property Policy</h2>
          </div>
          <div className="a-container">
            <p>
              Admisure’s marketplace model means we do not review or edit the
              courses for legal issues, and we are not in a position to
              determine the legality of course content. However, it is important
              to us that instructors posting courses on Admisure respect the
              intellectual property of others. When instructors post content on
              our marketplace, they agree that they have the necessary
              authorization or rights to use all the content contained in their
              tests.
            </p>
            <p>
              Infringing activity is not tolerated on or through our platform.
            </p>
            <p>
              This policy addresses what we do in the event of copyright
              infringement reports from content owners with respect to the tests
              on the Admisure platform. The policy also addresses what we do
              when Admisure instructors’ tests are copied on third-party
              platforms without their consent.
            </p>
            <h4 className="t-subtitle">
              Third-Party Copyright Infringement Reports
            </h4>
            <p>
              Admisure’s policy is to remove tests from our service when they
              are reported as infringing in a copyright infringement notice
              received from the owner of the original content. It is also our
              policy to remove all courses from any instructor who is determined
              to be a repeat infringer (for whom Admisure has received more than
              two valid takedown notices). We reserve the right to terminate an
              instructor’s account at any time, including when they post content
              in violation of the copyrights of others.
            </p>
            <p>
              <strong>How to File a Report</strong>
            </p>
            <p>
              If you would like to report a test on the Admisure marketplace and
              if you are the owner or the designated agent of the owner of the
              rights to the content that you believe the test is infringing, the
              most efficient way is to convey our support team.
            </p>
            <p>
              Before you submit a copyright infringement report, please remember
              these important things:
            </p>
            <ul>
              {/* import TopBar from './../../Core/TopBar/TopBar'; import NavBar from
              './../../Core/NavBar/NavBar'; */}
              <li>
                <p>
                  <strong>
                    We cannot process a copyright claim that is not submitted by
                    the owner of the copyright or its designated agent.
                  </strong>
                </p>
                <p>
                  This is because we have no way of knowing whether the
                  instructor who published the content you are reporting has
                  received proper permission from the owner to use the content.
                  We will ask you to provide an electronic signature to confirm
                  that you are the copyright owner or have authority to
                  represent the copyright owner (including if the copyright
                  owner is an organization).
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    Your copyright claim has to be sufficiently substantiated
                    for us be able to address it.
                  </strong>
                </p>
                <p>This means:</p>
                <ul>
                  <li>
                    You provide sufficient information for us to contact you,
                    including your full legal name, an email address, physical
                    address, and (optional) telephone number.
                  </li>
                  <li>
                    If you are filing a report on behalf of an organization, you
                    include the name of the organization and your relationship
                    to the organization.
                  </li>
                  <li>
                    You precisely identify the original copyrighted material or,
                    if multiple copyrighted works are covered in your
                    notification, you provide a sufficiently representative list
                    of such original material (such as a URL where the material
                    is located);
                  </li>
                  <li>
                    You provide sufficient information for us to locate the
                    reportedly infringing course(s) on the Admisure site (the
                    URL on our website and the exact name of the course and
                    instructor;
                  </li>
                  <li>
                    You add a statement saying: “I declare, under punishment of
                    copyright violation, that the information in this complaint
                    is accurate and that I am the copyright owner or am
                    authorized to act on the copyright owner's behalf and I have
                    a good faith belief that use of the material in the manner
                    complained of is not authorized by the copyright owner, its
                    agent, or the law”.
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  <strong>
                    Knowingly submitting a false or misleading claim of
                    infringement is illegal and you could be held liable and
                    have to pay damages as a result.
                  </strong>
                </p>
                <p>
                  Admisure reserves the right to seek damages from anyone who
                  submits a notification of claimed infringement in violation of
                  the law
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    There are types of content that are not protected by
                    copyright.
                  </strong>
                </p>
                <p>
                  Copyright law doesn’t cover short phrases (like business
                  names, book titles, and slogans, etc.), intangible concepts
                  (like processes, ideas, and recipes), or facts. Before you
                  submit a copyright claim, make sure that the content copied in
                  the course is indeed protected by copyright. If you need to
                  report a trademark violation, please mail us to{' '}
                  <a href="">legal@admisure.com</a> .
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    Consider whether the use of your material in the course is
                    “fair use”.
                  </strong>
                </p>
                <p>
                  Copyright law includes a “fair use” exception for certain uses
                  of copyrighted content that are considered to be in the public
                  interest. Fair use covers things like criticism, commentary,
                  news reporting, and research. In considering whether a test’s
                  use of your material qualifies as fair use, you should look
                  at:
                </p>
                <ul>
                  <li>
                    The purpose of the use (whether the test package is paid or
                    unpaid, whether the test critiques/parodies/transforms your
                    material)
                  </li>
                  <li>
                    The type of copyrighted work being used (whether your work
                    is factual or creative)
                  </li>
                  <li>
                    The portion being used (whether the content uses small,
                    necessary excerpts of your material or substantial portions
                    of it)
                  </li>
                  <li>
                    The effect on the market for your material (whether
                    potential buyers would purchase the test package instead of
                    your material)
                  </li>
                </ul>
                <p>
                  Before you submit a copyright claim, make sure that use of the
                  content copied in the test does not qualify as fair use.
                </p>
              </li>
            </ul>
            <h4 className="t-subtitle">Counter Notification</h4>
            <p>
              If we receive a valid copyright violation report, we will send a
              copy of that report to the coaching institute or independent
              educator who posted the reported content along with a notification
              that 1) the content was reported for copyright infringement and 2)
              we are removing the content from the Admisure service. We will
              also attach a form that the instructor can fill in and send back
              to us to submit a counter-notification. If your content has been
              reported for copyright infringement and removed from the Admisure
              service, and if you believe we made a mistake or that you have
              permission from the owner of the reported content to use such
              content in your test, then you may send us a counter-notification.
            </p>
            <p>
              The best way to provide us with a counter-notification is to fill
              in the form we provided you and send it back to the Admisure
              designated agent or the copyright team member who notified you. To
              be effective, a counter notification must be in writing and
              include the following information:
            </p>
            <ul>
              <li>Your physical or electronic signature;</li>
              <li>
                Your name, address, and email address or telephone number,
              </li>
              <li>
                Identification of the content that was removed and the location
                (URL) at which it appeared before it was removed (you can access
                this information from the copyright infringement report filed
                against your content, we always attach a copy when we notify
                you);
              </li>
              <li>
                A statement under penalty of perjury that you have a good faith
                belief that the material was removed or disabled as a result of
                mistake or misidentification of the material to be removed or
                disabled; and
              </li>
              <li>
                A statement that you consent to (i) Admisure sharing your name
                and contact information with the claimant; (ii) receiving
                service of process for any legal action by the claimant or an
                agent of the claimant and (ii) accepting the jurisdiction of the
                district court for the judicial district in which you reside, or
                where the claimant reside.{' '}
              </li>
            </ul>
            <h4 className="t-subtitle">Governing Law</h4>
            <p>
              This policy is designed and governed in reference to the laws of
              India any dispute shall be heard at the local administrative
              bodies and you agree that the courts of Kolkata will have
              exclusive jurisdiction over any dispute (contractual or
              non-contractual) concerning these terms.
            </p>
            <br />
            <br />
            <p>
              Last revised on{' '}
             5 July 2021
              {/* {new Date().toString().split(' ').splice(1, 3).join(' ')} */}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

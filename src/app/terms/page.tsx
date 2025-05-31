import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GridBackground } from "@/components/ui/grid-background";
import { ArrowLeft, FileText, Calendar, Shield } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-background">
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-4">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Terms & Conditions
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: {lastUpdated}</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Please read these Terms and Conditions carefully before using
                the COLLECTIVE platform. By accessing or using our service, you
                agree to be bound by these terms.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    1. Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using COLLECTIVE (&quot;the
                    Platform&quot;), you accept and agree to be bound by the
                    terms and provision of this agreement. If you do not agree
                    to abide by the above, please do not use this service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms of Service apply to all users of the Platform,
                    including without limitation users who are browsers,
                    vendors, customers, merchants, and/or contributors of
                    content.
                  </p>
                </CardContent>
              </Card>

              {/* Platform Description */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Platform Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    COLLECTIVE is a creative platform that organizes recurring
                    thematic hackathons spanning multiple creative fields
                    including writing, art, music, and business challenges. The
                    platform allows users to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Participate in hackathons by submitting creative work
                    </li>
                    <li>Vote on submissions from other participants</li>
                    <li>Compete for monetary prizes and recognition</li>
                    <li>Connect with other creative professionals</li>
                    <li>Showcase their work in public galleries</li>
                  </ul>
                </CardContent>
              </Card>

              {/* User Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle>3. User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    To access certain features of the Platform, you must
                    register for an account. When you create an account, you
                    must provide information that is accurate, complete, and
                    current at all times.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You are responsible for safeguarding the password and for
                    all activities that occur under your account. You agree not
                    to disclose your password to any third party and to take
                    sole responsibility for any activities or actions under your
                    account.
                  </p>
                </CardContent>
              </Card>

              {/* Hackathon Participation */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Hackathon Participation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      4.1 Entry Requirements
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Participation in hackathons may require payment of an
                      entry fee. Entry fees are non-refundable unless the
                      hackathon is cancelled by COLLECTIVE.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      4.2 Submission Guidelines
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>
                        All submissions must be original work created by the
                        participant
                      </li>
                      <li>
                        Submissions must comply with the specific hackathon
                        theme and requirements
                      </li>
                      <li>
                        Plagiarism or copyright infringement will result in
                        disqualification
                      </li>
                      <li>
                        Submissions must be appropriate and not contain
                        offensive content
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      4.3 Prizes and Awards
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Prize pools are determined by the total entry fees
                      collected minus platform commission. Winners are
                      determined through community voting and/or judging panels
                      as specified for each hackathon.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Intellectual Property */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Intellectual Property Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    You retain ownership of all intellectual property rights in
                    your submissions. By submitting content to the Platform, you
                    grant COLLECTIVE a non-exclusive, worldwide, royalty-free
                    license to display, distribute, and promote your work in
                    connection with the Platform and hackathon activities.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The Platform and its original content, features, and
                    functionality are and will remain the exclusive property of
                    COLLECTIVE and its licensors.
                  </p>
                </CardContent>
              </Card>

              {/* Prohibited Uses */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Prohibited Uses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    You may not use the Platform:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>
                      For any unlawful purpose or to solicit others to perform
                      unlawful acts
                    </li>
                    <li>
                      To violate any international, federal, provincial, or
                      state regulations, rules, laws, or local ordinances
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property
                      rights or the intellectual property rights of others
                    </li>
                    <li>
                      To harass, abuse, insult, harm, defame, slander,
                      disparage, intimidate, or discriminate
                    </li>
                    <li>To submit false or misleading information</li>
                    <li>
                      To upload or transmit viruses or any other type of
                      malicious code
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Payment Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Payment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Entry fees for hackathons are processed through secure
                    third-party payment processors. All payments are final and
                    non-refundable except in cases where COLLECTIVE cancels a
                    hackathon.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Prize payments will be distributed to winners within 30 days
                    of hackathon completion, subject to verification of
                    eligibility and compliance with these terms.
                  </p>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall COLLECTIVE, nor its directors, employees,
                    partners, agents, suppliers, or affiliates, be liable for
                    any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses,
                    resulting from your use of the Platform.
                  </p>
                </CardContent>
              </Card>

              {/* Termination */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Termination</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account and bar access to
                    the Platform immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever and
                    without limitation, including but not limited to a breach of
                    the Terms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If you wish to terminate your account, you may simply
                    discontinue using the Platform.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material,
                    we will provide at least 30 days notice prior to any new
                    terms taking effect.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    What constitutes a material change will be determined at our
                    sole discretion. By continuing to access or use our Platform
                    after any revisions become effective, you agree to be bound
                    by the revised terms.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>11. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms and Conditions,
                    please contact us at:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Email: legal@collective.com
                      <br />
                      Address: 123 Creative Street, Innovation City, IC 12345
                      <br />
                      Phone: +1 (555) 123-4567
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-12" />

            {/* Footer */}
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                By using COLLECTIVE, you acknowledge that you have read and
                understood these Terms and Conditions and agree to be bound by
                them.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/privacy">Privacy Policy</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GridBackground } from "@/components/ui/grid-background";
import {
  ArrowLeft,
  Shield,
  Calendar,
  Eye,
  Lock,
  Database,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Privacy Policy
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: {lastUpdated}</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Your privacy is important to us. This Privacy Policy explains
                how COLLECTIVE collects, uses, and protects your information
                when you use our platform.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Information We Collect */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    1. Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      1.1 Personal Information
                    </h4>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      When you create an account, we collect:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Name and email address</li>
                      <li>Profile picture and bio (optional)</li>
                      <li>Social media links (optional)</li>
                      <li>Payment information for hackathon entries</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      1.2 Content and Submissions
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We collect and store the creative work you submit to
                      hackathons, including artwork, writing, audio files,
                      business plans, and any associated descriptions or
                      metadata.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      1.3 Usage Information
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We automatically collect information about how you use our
                      platform, including pages visited, features used, voting
                      patterns, and interaction with other users&apos; content.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      1.4 Technical Information
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* How We Use Your Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    2. How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Provide and maintain our platform services</li>
                    <li>Process hackathon entries and manage competitions</li>
                    <li>Facilitate voting and community interactions</li>
                    <li>Process payments and distribute prizes</li>
                    <li>
                      Send important updates about hackathons and platform
                      changes
                    </li>
                    <li>
                      Improve our platform through analytics and user feedback
                    </li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Information Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      3.1 Public Information
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Your submissions, profile information, and voting activity
                      may be visible to other users as part of the
                      platform&apos;s community features. You can control some
                      of these privacy settings in your account preferences.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      3.2 Service Providers
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share your information with trusted third-party
                      service providers who help us operate our platform,
                      including payment processors, cloud storage providers, and
                      analytics services.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      3.3 Legal Requirements
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We may disclose your information if required by law, court
                      order, or government request, or to protect our rights,
                      property, or safety.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      3.4 Business Transfers
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      In the event of a merger, acquisition, or sale of assets,
                      your information may be transferred as part of that
                      transaction.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    4. Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or
                    destruction.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>
                      Regular security audits and vulnerability assessments
                    </li>
                    <li>Access controls and authentication measures</li>
                    <li>
                      Secure payment processing through certified providers
                    </li>
                    <li>Regular backups and disaster recovery procedures</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    However, no method of transmission over the internet or
                    electronic storage is 100% secure, and we cannot guarantee
                    absolute security.
                  </p>
                </CardContent>
              </Card>

              {/* Your Rights and Choices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    5. Your Rights and Choices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Depending on your location, you may have the following
                    rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      <strong>Access:</strong> Request a copy of the personal
                      information we hold about you
                    </li>
                    <li>
                      <strong>Correction:</strong> Request correction of
                      inaccurate or incomplete information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your
                      personal information (subject to certain limitations)
                    </li>
                    <li>
                      <strong>Portability:</strong> Request transfer of your
                      data to another service
                    </li>
                    <li>
                      <strong>Restriction:</strong> Request limitation of how we
                      process your information
                    </li>
                    <li>
                      <strong>Objection:</strong> Object to certain types of
                      processing
                    </li>
                    <li>
                      <strong>Withdraw Consent:</strong> Withdraw consent for
                      processing based on consent
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    To exercise these rights, please contact us at
                    privacy@collective.com. We will respond to your request
                    within 30 days.
                  </p>
                </CardContent>
              </Card>

              {/* Cookies and Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Cookies and Tracking Technologies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar tracking technologies to enhance
                    your experience on our platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      <strong>Essential Cookies:</strong> Required for basic
                      platform functionality
                    </li>
                    <li>
                      <strong>Performance Cookies:</strong> Help us understand
                      how users interact with our platform
                    </li>
                    <li>
                      <strong>Functional Cookies:</strong> Remember your
                      preferences and settings
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver
                      relevant advertisements (with your consent)
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    You can control cookie settings through your browser
                    preferences. However, disabling certain cookies may affect
                    platform functionality.
                  </p>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Data Retention</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information for as long as necessary
                    to provide our services and fulfill the purposes outlined in
                    this Privacy Policy:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Account information: Until you delete your account</li>
                    <li>
                      Submissions: Indefinitely for platform showcase and
                      historical purposes
                    </li>
                    <li>
                      Payment information: As required by financial regulations
                    </li>
                    <li>Usage data: Up to 3 years for analytics purposes</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    When you delete your account, we will remove your personal
                    information within 30 days, except where retention is
                    required by law.
                  </p>
                </CardContent>
              </Card>

              {/* International Transfers */}
              <Card>
                <CardHeader>
                  <CardTitle>8. International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Your information may be transferred to and processed in
                    countries other than your own. We ensure appropriate
                    safeguards are in place to protect your information in
                    accordance with applicable data protection laws.
                  </p>
                </CardContent>
              </Card>

              {/* Children's Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Children&apos;s Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform is not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13. If you believe we have collected
                    information from a child under 13, please contact us
                    immediately.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Privacy Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any material changes by posting the new
                    Privacy Policy on this page and updating the &quot;Last
                    updated&quot; date.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We encourage you to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>11. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or our
                    privacy practices, please contact us:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Privacy Officer</strong>
                      <br />
                      Email: privacy@collective.com
                      <br />
                      Address: 123 Creative Street, Innovation City, IC 12345
                      <br />
                      Phone: +1 (555) 123-4567
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    For EU residents, you also have the right to lodge a
                    complaint with your local data protection authority if you
                    believe we have not addressed your concerns adequately.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-12" />

            {/* Footer */}
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                By using COLLECTIVE, you acknowledge that you have read and
                understood this Privacy Policy.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/terms">Terms & Conditions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}

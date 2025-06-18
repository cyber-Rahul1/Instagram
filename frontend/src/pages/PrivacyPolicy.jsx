import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginFooter from '../components/LoginFooter'
import OtpNavbar from '../components/OtpNavbar'

const PrivacyPolicy = () => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Privacy Policy - Instagram'
    }, [])

    return (
        <div className="min-h-screen bg-black text-white py-8">
            {/* Header */}
            <div className="w-full border-b border-[#363636] bg-black">
                <div className='w-full h-fit fixed top-0 left-0'>
                    <OtpNavbar />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-black">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
                        <p className="text-[#c5c1bcc4] text-sm">Effective Date: January 1, 2025</p>
                    </div>

                    {/* Introduction */}
                    <section className="mb-8">
                        <p className="text-[#ffffffe9] text-base leading-6 mb-4">
                            At Instagram, we care about your privacy. This Privacy Policy explains how we collect, use, and share information when you use our service. By using Instagram, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </section>

                    {/* What Information We Collect */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">What Information We Collect</h2>
                        <div className="text-[#ffffffe9] text-base leading-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Information You Provide</h3>
                                <ul className="list-disc list-inside space-y-2 text-[#c5c1bcc4]">
                                    <li>Account information (username, email, phone number, password)</li>
                                    <li>Profile information (name, bio, profile picture)</li>
                                    <li>Content you create (photos, videos, stories, comments, messages)</li>
                                    <li>Communications with us and other users</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Information We Collect Automatically</h3>
                                <ul className="list-disc list-inside space-y-2 text-[#c5c1bcc4]">
                                    <li>Device information (device type, operating system, browser type)</li>
                                    <li>Usage information (how you interact with our service)</li>
                                    <li>Location information (if you enable location services)</li>
                                    <li>Log information (IP address, access times, pages viewed)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Information */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">How We Use Information</h2>
                        <div className="text-[#ffffffe9] text-base leading-6">
                            <p className="mb-4">We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 text-[#c5c1bcc4]">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Personalize your experience and content</li>
                                <li>Communicate with you about our services</li>
                                <li>Ensure safety and security of our platform</li>
                                <li>Comply with legal obligations</li>
                                <li>Develop new features and services</li>
                            </ul>
                        </div>
                    </section>

                    {/* Information Sharing */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Information Sharing</h2>
                        <div className="text-[#ffffffe9] text-base leading-6 space-y-4">
                            <p>We may share your information in the following circumstances:</p>
                            <ul className="list-disc list-inside space-y-2 text-[#c5c1bcc4]">
                                <li>With other users when you choose to share content publicly</li>
                                <li>With service providers who help us operate our platform</li>
                                <li>With law enforcement when required by law</li>
                                <li>In connection with a merger, acquisition, or sale of assets</li>
                                <li>With your consent for other purposes</li>
                            </ul>
                        </div>
                    </section>

                    {/* Your Rights and Choices */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Your Rights and Choices</h2>
                        <div className="text-[#ffffffe9] text-base leading-6 space-y-4">
                            <p>You have the following rights regarding your information:</p>
                            <ul className="list-disc list-inside space-y-2 text-[#c5c1bcc4]">
                                <li>Access and update your account information</li>
                                <li>Delete your account and associated data</li>
                                <li>Control who can see your content</li>
                                <li>Opt out of certain communications</li>
                                <li>Request a copy of your data</li>
                                <li>Control cookie preferences</li>
                            </ul>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Data Security</h2>
                        <div className="text-[#ffffffe9] text-base leading-6">
                            <p className="mb-4">
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                            </p>
                            <p>
                                We regularly review our security practices and update them as necessary to maintain the security of your information.
                            </p>
                        </div>
                    </section>

                    {/* Children's Privacy */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Children's Privacy</h2>
                        <div className="text-[#ffffffe9] text-base leading-6">
                            <p>
                                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                            </p>
                        </div>
                    </section>

                    {/* International Data Transfers */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">International Data Transfers</h2>
                        <div className="text-[#ffffffe9] text-base leading-6">
                            <p>
                                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and that your information receives adequate protection.
                            </p>
                        </div>
                    </section>

                    {/* Updates to This Policy */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Updates to This Policy</h2>
                        <div className="text-[#ffffffe9] text-base leading-6">
                            <p className="mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
                            </p>
                            <p>
                                We encourage you to review this Privacy Policy periodically for any changes. Your continued use of our service after any modifications constitutes acceptance of the updated Privacy Policy.
                            </p>
                        </div>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
                        <div className="text-[#ffffffe9] text-base leading-6">
                            <p className="mb-4">
                                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                            </p>
                            <div className="bg-[#121212] border border-[#363636] rounded-lg p-4">
                                <p className="text-[#c5c1bcc4] mb-2">Email: privacy@instagram.com</p>
                                <p className="text-[#c5c1bcc4] mb-2">Address: 1601 Willow Road, Menlo Park, CA 94025</p>
                                <p className="text-[#c5c1bcc4]">Phone: 1-650-543-4800</p>
                            </div>
                        </div>
                    </section>

                    {/* Back to Login */}
                    <div className="text-center mt-12 mb-8">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[#0087eb] hover:text-[#0087ebcc] cursor-pointer font-semibold text-sm transition-all duration-200 ease-in-out"
                        >
                            ← Back to Login
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <LoginFooter page="privacyPolicy" />
        </div>
    )
}

export default PrivacyPolicy

import  { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginFooter from '../components/LoginFooter'
import OtpNavbar from '../components/OtpNavbar'
import { ServerContext } from '../context/ContextProvider'

const DataDeletion = () => {
    const navigate = useNavigate()
    const {page} = useContext(ServerContext)


    useEffect(() => {
        document.title = 'Data Deletion - Instagram'
    }, [])

    return (
        <div className="min-h-screen bg-black text-white py-8">
            {/* Header */}
            <div className="w-full border-b border-[#363636] bg-black">
                <div className="w-full border-b border-[#363636] bg-black">
                    <div className='w-full h-fit fixed top-0 left-0'>
                        <OtpNavbar />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-black">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Data Deletion</h1>
                        <p className="text-[#c5c1bcc4] text-sm">Request deletion of your account and data</p>
                    </div>

                    {/* Main Content */}
                    <section className="mb-8">
                        <div className="bg-[#121212] border border-[#363636] rounded-lg p-8 text-center">
                            <h2 className="text-xl font-semibold text-white mb-6">User Data Deletion Instructions</h2>
                            <p className="text-[#ffffffe9] text-base leading-6 mb-6">
                                To delete your data from our app, please email us at{' '}
                                <a
                                    href="mailto:instagramclone0@gmail.com"
                                    className="text-[#0087eb] hover:text-[#0087ebcc] underline transition-all duration-200 ease-in-out"
                                >
                                    instagramclone0@gmail.com
                                </a>
                                {' '}with your registered email address. We will delete your account and all associated data within 48 hours.
                            </p>

                            {/* Additional Information */}
                            <div className="bg-[#1a1a1a] border border-[#363636] rounded-lg p-6 mt-6">
                                <h3 className="text-lg font-medium text-white mb-4">What happens when you request deletion?</h3>
                                <ul className="text-left list-disc list-inside space-y-2 text-[#c5c1bcc4]">
                                    <li>Your account will be permanently deleted</li>
                                    <li>All your posts, stories, and messages will be removed</li>
                                    <li>Your profile information will be erased</li>
                                    <li>This action cannot be undone</li>
                                </ul>
                            </div>

                            {/* Contact Information */}
                            <div className="mt-6 p-4 bg-[#0a0a0a] border border-[#363636] rounded-lg">
                                <p className="text-[#c5c1bcc4] text-sm mb-2">
                                    <strong className="text-white">Email:</strong> instagramclone0@gmail.com
                                </p>
                                <p className="text-[#c5c1bcc4] text-sm">
                                    <strong className="text-white">Response Time:</strong> Within 48 hours
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Additional Information */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Important Notes</h2>
                        <div className="text-[#ffffffe9] text-base leading-6 space-y-4">
                            <div className="bg-[#121212] border border-[#363636] rounded-lg p-6">
                                <ul className="list-disc list-inside space-y-3 text-[#c5c1bcc4]">
                                    <li>Make sure to use the same email address that you registered with</li>
                                    <li>Include your username in the email for faster processing</li>
                                    <li>Download any content you want to keep before requesting deletion</li>
                                    <li>The deletion process is irreversible once completed</li>
                                    <li>You will receive a confirmation email once the deletion is complete</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Alternative Options */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Alternative Options</h2>
                        <div className="text-[#ffffffe9] text-base leading-6">
                            <p className="mb-4">Before requesting permanent deletion, consider these alternatives:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-[#121212] border border-[#363636] rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-white mb-2">Deactivate Account</h3>
                                    <p className="text-[#c5c1bcc4] text-sm">
                                        Temporarily disable your account without losing your data. You can reactivate it anytime.
                                    </p>
                                </div>
                                <div className="bg-[#121212] border border-[#363636] rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-white mb-2">Privacy Settings</h3>
                                    <p className="text-[#c5c1bcc4] text-sm">
                                        Adjust your privacy settings to control who can see your content and information.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Back to Login */}
                    <div className="text-center mt-12 mb-8">
                        <button
                            onClick={() => navigate(page === 'signup' ? '/signup' : '/login')}
                            className="text-[#0087eb] hover:text-[#0087ebcc] cursor-pointer font-semibold text-sm transition-all duration-200 ease-in-out"
                        >
                            ← Back to {page === 'signup' ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <LoginFooter page="dataDeletion" />
        </div>
    )
}

export default DataDeletion

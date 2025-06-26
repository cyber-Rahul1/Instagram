

const WorkInProgess = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="text-center px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                    🚧 Coming Soon
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    We're working hard to bring you something awesome. Stay tuned!
                </p>
                <div className="animate-bounce text-3xl dark:text-white text-gray-800">
                    🔧
                </div>
            </div>
        </div>
    );
};

export default WorkInProgess;

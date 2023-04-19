function LoadingPage() {
    return (
        <main className='d-flex flex-column min-vh-100'>

            <div className="d-flex justify-content-center py-5 my-5">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </main>
    )
}
export default LoadingPage;
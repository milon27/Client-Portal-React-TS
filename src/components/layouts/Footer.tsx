export default function Footer() {
    return (
        <footer className="sticky-footer bg-light">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; {new Date().getFullYear()} <a target="_blank" href="https://lighter.ai/">lighter.ai</a> - Developed by <a target="_blank" href="https://github.com/milon27">milon27</a></span>
                </div>
            </div>
        </footer>
    )
}
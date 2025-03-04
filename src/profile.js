const router = new Navigo('/', {
    linksSelector: 'a',
})

const profilePage = () => {
    return `
        <div>
            <p id="banner" class="p-7"></p>
            <a href="/login" class="ml-7 hidden" id="navi">
                <button
                    class="login mr-2 border px-6 py-2 rounded-xl bg-blue-500 cursor-pointer hover:bg-blue-400 text-white"
                >
                    Login
                </button>
            </a>
        </div>
    `
}

router.resolve()
export default profilePage

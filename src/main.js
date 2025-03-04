import Navigo from 'navigo'
import loginForm from './login'
import profilePage from './profile'

const app = document.getElementById('app')
const abc = document.getElementById('abc')
const defaultHTML = app.innerHTML
const router = new Navigo('/', {
    linksSelector: 'a',
})

router.on('/', () => {
    app.innerHTML = defaultHTML
})

router.on('/login', () => {
    app.innerHTML = loginForm()

    const fec = (email, password) => {
        const auth = {
            email,
            password,
        }
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify(auth),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                router.navigate('/')
                window.localStorage.setItem('email', email)
                window.localStorage.setItem('password', password)
            })
            .catch((error) => {
                console.log('>>> Check error: ', error)
                alert('Đăng nhập thất bại!, vui lòng nhập đúng email và mật khẩu')
            })
    }

    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        fec(email, password)
    })
})

router.on('/profile', () => {
    app.innerHTML = profilePage()
    const $banner = document.querySelector('#banner')
    const navi = document.getElementById('navi')

    const $nameInStorage = window.localStorage.getItem('email')
    if ($nameInStorage) {
        $banner.textContent = `Hello, ${$nameInStorage}`
    }
    else {
        $banner.textContent = `Cần đăng nhập để xem`
        navi.style.display = "block"
    }
})

router.resolve()

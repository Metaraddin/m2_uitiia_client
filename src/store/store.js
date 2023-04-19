import {makeAutoObservable} from 'mobx';
import Auth from "../utils/user";

export default class Store {
    user = {}
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async login(email, password, remember) {
        try {
            const response = await Auth.login(email, password, remember)
            localStorage.setItem('access_token', response.data.Token.access_token)
            this.setAuth(true)
            this.setUser(response.data.User)
        } catch (e) {
            // console.log(e.response?.data?.detail[0].msg)
            // if (e.response?.data?.detail[0].msg === 'Incorrect email or password')
            throw e
        }
    }

    async createUser(email, password, firstName, lastName, middleName) {
        try {
            const response = await Auth.createUser(email, password, firstName, lastName, middleName)
            localStorage.setItem('access_token', response.data.Token.access_token)
            this.setAuth(true)
            this.setUser(response.data.User)
        } catch (e) {
            // console.log(e.response?.data?.detail[0].msg)
            throw e
        }
    }

    async logout() {
        try {
            const response = await Auth.logout()
            localStorage.removeItem('access_token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e)
        }
    }

    async checkAccess() {
        this.setLoading(true)
        try {
            const response = await Auth.getCurrentUser()
            console.log(response)
            this.setAuth(true)
            this.setUser(response.data.User)
            return true
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }
}
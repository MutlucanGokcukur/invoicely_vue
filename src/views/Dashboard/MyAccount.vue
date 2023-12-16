<template>
    <div class="page-my-account">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li class="is-active"><router-link to="/dashboard/my-account" aria-current="true">My account</router-link></li>
            </ul>
        </nav>

        <h1 class="title">My account</h1>
        <strong>Email: </strong>{{ $store.state.user.username }}

        <hr>

        <div class="buttons">
            <button @click="logout()" class="button is-danger">Log out</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MyAccount',
    data() {
        return {
        }
    },
    async mounted() {
    },
    methods: {
        logout() {
            axios
                .post("/api/v1/token/logout/")
                .then(response => {
                    axios.defaults.headers.common["Authorization"] = ""

                    localStorage.removeItem("username")
                    localStorage.removeItem("userid")
                    localStorage.removeItem("token")

                    this.$store.commit('removeToken')

                    this.$router.push('/')
                })
                .catch(error => {
                    if (error.response) {
                        console.log(JSON.stringify(error.response.data))
                    } else if (error.message) {
                        console.log(JSON.stringify(error.message))
                    } else {
                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}
</script>
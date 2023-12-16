<template>
    <div class="page-dashboard">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Dashboard</h1>
            </div>

            <div class="column is-6">
                <div class="box">
                    <h2 class="subtitle">Newest clients</h2>
                    <div v-for="client in clients" v-bind:key="client.id">
                        <div class="box mb-2">
                            <h3 class="is-size-4 mb-4">{{ client.name }}</h3>
                            <router-link :to="{ name: 'Client', params: { id: client.id }}" class="button is-light">Details</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Dashboard',
    data() {
        return {
            clients: [],
        }
    },
    mounted() {
        this.getClients()
    },
    methods: {
        getClients() {
            axios
                .get('/api/v1/clients/')
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (this.clients.length <= 5) {
                            this.clients.push(response.data[i])
                        }
                    }
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }
    },
    computed: {
        unpaidInvoices() {
            return this.invoices.filter(invoice => invoice.is_paid === false)
        },
    }
}
</script>
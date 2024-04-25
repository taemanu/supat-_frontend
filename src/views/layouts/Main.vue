<template>
    <div class="wrapper">
        <SidebarVue />
		<div class="main">
			<NavbarVue />
            <router-view></router-view>
            <FooterVue />
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
import FooterVue from '../../components/Footer.vue';
import NavbarVue from '../../components/Navbar.vue';
import SidebarVue from '../../components/Sidebar.vue';

const router = useRouter()

onMounted(() => {
    var sidebarActive = ref('dashboard');
    if (sidebarActive.value == 'dashboard') {
        document.getElementById('menu0').classList.add('active')
        router.push('/app/dashboard')
    }
    // document.addEventListener("DOMContentLoaded", function() {
    //     var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
    //     var gradient = ctx.createLinearGradient(0, 0, 0, 225);
    //     gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
    //     gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
    //     // Line chart
    //     new Chart(document.getElementById("chartjs-dashboard-line"), {
    //         type: "line",
    //         data: {
    //             labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //             datasets: [{
    //                 label: "Sales ($)",
    //                 fill: true,
    //                 backgroundColor: gradient,
    //                 borderColor: window.theme.primary,
    //                 data: [
    //                     2115,
    //                     1562,
    //                     1584,
    //                     1892,
    //                     1587,
    //                     1923,
    //                     2566,
    //                     2448,
    //                     2805,
    //                     3438,
    //                     2917,
    //                     3327
    //                 ]
    //             }]
    //         },
    //         options: {
    //             maintainAspectRatio: false,
    //             legend: {
    //                 display: false
    //             },
    //             tooltips: {
    //                 intersect: false
    //             },
    //             hover: {
    //                 intersect: true
    //             },
    //             plugins: {
    //                 filler: {
    //                     propagate: false
    //                 }
    //             },
    //             scales: {
    //                 xAxes: [{
    //                     reverse: true,
    //                     gridLines: {
    //                         color: "rgba(0,0,0,0.0)"
    //                     }
    //                 }],
    //                 yAxes: [{
    //                     ticks: {
    //                         stepSize: 1000
    //                     },
    //                     display: true,
    //                     borderDash: [3, 3],
    //                     gridLines: {
    //                         color: "rgba(0,0,0,0.0)"
    //                     }
    //                 }]
    //             }
    //         }
    //     });
    // });
})
</script>
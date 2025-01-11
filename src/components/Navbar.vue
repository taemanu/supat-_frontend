<template>
    <nav class="navbar navbar-expand navbar-light navbar-bg">
        <!-- <a class="sidebar-toggle js-sidebar-toggle">
            <i class="hamburger align-self-center"></i>
        </a> -->

        <div class="navbar-collapse collapse">
            <ul class="navbar-nav navbar-align">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                        <img src="/construct.svg" class="avatar img-fluid rounded me-1" alt="Charles Hall" /> 
                        <span class="text-dark">
                            {{ store_auth.user.name }}
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                        <router-link class="dropdown-item" to="/app/profile" @click="resetMenu(2)" v-show="role_show">
                            <i class="align-middle me-1" data-feather="user"></i>
                            โปรไฟล์
                        </router-link>
                        <a class="dropdown-item" href="#" @click="store_auth.logout()">
                            <i class="align-middle me-1" data-feather="log-out"></i>
                            ออกจากระบบ
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style>
</style>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { userAuthStore } from "@/stores/models/userAuthStore";

    const store_auth = userAuthStore()
	const route = useRouter();
    const currentPath = ref(route.currentRoute.value.path);
    const role_show = ref(store_auth.user.role == 'super_admin' ? false : true);

	const menu = [
		{
			name: "ผู้ใช้งานระบบ",
			icon: "bi bi-people",
			url: "/app/user",
		},

	];
	function resetMenu(key) {
		let el = document.querySelectorAll('.sidebar-item')
		el.forEach(function(item,key) {
			item.classList.remove('active');
		})
		document.getElementById('menu'+key).classList.add('active')
	}

    // return { menu,resetMenu };

</script>
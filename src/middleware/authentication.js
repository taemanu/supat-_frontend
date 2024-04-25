import { userAuthStore } from "@/stores/models/userAuthStore";

export default ({ to, from, next }) => {

  const store_auth = userAuthStore();
  const is_user = !!store_auth.user;
  const to_name = to.name

  if (!to_name) {
		console.log('route name not define: ' + to.fullPath);
	}

  if (!is_user) {
		store_auth.refresh().then((result) => {
			if (result) {
				next()
				return
			}
		})
	} 
  else {
		store_auth.me()
		// console.log('authentication: ', to);
		next()
		return
	}

	next("/")
	return false


  }
  
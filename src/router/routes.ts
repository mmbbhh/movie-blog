import store from "@/store";

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/userService',
    name: 'Resign',
    component: () => import('@/views/Resign.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/blog/Blog.vue')
  },
  {
    path: '/myblogs',
    name: 'MyBlogs',
    component: () => import('@/views/blog/MyBlogs.vue'),
    beforeEnter: (to: any, from: any, next: () => void) => {
      if (store.getters.ifLogin) {
        next()
      } else {

      }
    }
  }
]
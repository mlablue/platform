import Vue from 'vue'
import Router from 'vue-router'
import LayoutPageDashboard from '@/components/layouts/LayoutPageDashboard'
import PageProject from '@/components/pages/PageProject'
import PageProjectList from '@/components/pages/PageProjectList'
import PageCloudList from '@/components/pages/PageCloudList'
import PageComponents from '@/components/pages/PageComponents'
import PageViewer from '@/components/pages/PageViewer'
import OidcCallback from '@/components/pages/PageOIDCCallback'
import PageSignInRequired from '@/components/pages/PageSignInRequired'
import oidcRouterMiddleware from './oidcRouterMiddleware'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: LayoutPageDashboard,
      meta: {
        isPublic: false
      },
      children: [
        {
          path: '',
          name: 'home',
          component: PageCloudList,
          meta: {
            isPublic: false,
            container: 'container p-0'
          }
        },
        {
          path: 'cloud/:id(\\d+)',
          name: 'project-list',
          component: PageProjectList,
          meta: {
            isPublic: false,
            container: 'container p-0'
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)/project/:projectId(\\d+)',
          name: 'project',
          component: PageProject,
          meta: {
            isPublic: false
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)/project/:projectId(\\d+)/viewer/:ifcId(\\d+)',
          name: 'viewer',
          component: PageViewer,
          meta: {
            isPublic: false
          }
        }
      ]
    },
    {
      path: '/components',
      name: 'components',
      component: PageComponents,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/oidc-callback', // Needs to match redirect_uri in you oidcSettings
      name: 'oidcCallback',
      component: OidcCallback,
      meta: {
        isVuexOidcCallback: true,
        isPublic: true
      }
    },
    {
      path: '/signin-required', // Needs to match redirect_uri in you oidcSettings
      name: 'signin-required',
      component: PageSignInRequired,
      meta: {
        isVuexOidcCallback: false,
        isPublic: true
      }
    }
  ]
})

router.beforeEach(oidcRouterMiddleware(store))

export default router

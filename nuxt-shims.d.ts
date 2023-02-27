declare module '@nuxtjs/auth' {
    import { NuxtAxiosInstance } from '@nuxtjs/axios'
    import { Plugin } from '@nuxt/types'
  
    interface Auth {
      loggedIn: boolean
      user: any
      strategy: {
        name: string
      }
      loginWith(strategyName: string, ...args: any[]): Promise<void>
      login(...args: any[]): Promise<void>
      fetchUser(): Promise<void>
      logout(): Promise<void>
      setUserToken(token: string | false): void
      setToken(strategyName: string, token?: string | false): void
      getToken(strategyName: string): string | false | undefined
      reset(): void
    }
  
    interface AuthOptions {
      strategies: {
        local: {
          endpoints: {
            login: {
              url: string
              method: string
              propertyName: string
            }
            logout: {
              url: string
              method: string
            }
            user: {
              url: string
              method: string
              propertyName: string
            }
          }
        }
      }
    }
  
    const auth: ((
      context: {
        $axios: NuxtAxiosInstance
      },
      inject: (key: string, value: any) => void
    ) => Promise<void>) &
      Auth & {
        ctx: any
        options: AuthOptions
        $state: any
      }
  
    export default auth
  }
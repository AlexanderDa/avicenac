import Vue from 'vue'
import router from '@/router'

class VueNotify extends Vue {
  public success (message: string, caption?: string): void {
    this.$q.notify({
      color: 'green',
      position: 'top-right',
      icon: 'check_circle',
      message,
      caption,
      actions: [
        { icon: 'close', color: 'white', handler: () => { } }
      ]
    })
  }

  public error (message: string, caption?: string): void {
    this.$q.notify({
      color: 'red',
      position: 'top-right',
      icon: 'error',
      message,
      caption,
      actions: [
        { icon: 'close', color: 'white', handler: () => { } }
      ]
    })
  }

  public warning (message: string, caption?: string): void {
    this.$q.notify({
      color: 'orange',
      position: 'top-right',
      icon: 'warning',
      message,
      caption,
      actions: [
        { icon: 'close', color: 'white', handler: () => { } }
      ]
    })
  }

  public info (message: string, caption?: string): void {
    this.$q.notify({
      color: 'blue',
      position: 'top-right',
      icon: 'info',
      message,
      caption,
      actions: [
        { icon: 'close', color: 'white', handler: () => { } }
      ]
    })
  }

  private expiredSession (): void {
    this.$q.dialog({
      title: 'Su sesión expiró',
      message: 'Ningún cambio fue guardado, para continuar por favor inicie sesión.',
      persistent: true
    }).onOk(() => {
      router.replace({ name: 'RootPage' })
    })
  }

  public onCreateSuccess (caption?: string): void {
    this.success('Registro exitoso', caption)
  }
  public onUpdateSuccess (caption?: string): void {
    this.success('Actualización exitosa', caption)
  }
  public onDeleteSuccess (caption?: string): void {
    this.success('Eliminación exitoso', caption)
  }

  public onCreateError (error: any, model?: string): void {
    switch (error.status) {
      case 401:
        this.expiredSession()
        break
      case 409:
        switch (error.body.error.message) {
          case 'EMAIL_IN_USE':
            this.warning('Confictivo', `El correo electrónico ya está en uso.`)
            break

          default:
            this.warning('Confictivo', `El ${model || 'registro'} es duplicado.`)
            break
        }
        break

      default:
        this.error('Error', 'El registro no se pudo guardar.')
        break
    }
  }

  public onLoadError (error: any): void {
    switch (error.status) {
      case 401:
        this.expiredSession()
        break

      default:
        this.error('Error', 'No se pudo cargar los datos')
        break
    }
  }

  public onUpdateError (error: any, model?: string): void {
    switch (error.status) {
      case 401:
        this.expiredSession()
        break

      default:
        this.error('Error', 'El registro no se pudo actualizar.')
        break
    }
  }

  public onDeleteError (error: any, model?: string): void {
    switch (error.status) {
      case 401:
        this.expiredSession()
        break
      case 409:
        this.warning('Confictivo', `El ${model || 'registro'} está en uso.`)
        break

      default:
        this.error('Error', 'El registro no se pudo eliminar.')
        break
    }
  }
}

export default class Notify {
  public success (message: string, caption?: string): void {
    new VueNotify().success(message, caption)
  }

  public error (message: string, caption?: string): void {
    new VueNotify().error(message, caption)
  }

  public warning (message: string, caption?: string): void {
    new VueNotify().warning(message, caption)
  }

  public info (message: string, caption?: string): void {
    new VueNotify().info(message, caption)
  }
  public onCreateSuccess (caption?: string): void {
    new VueNotify().onCreateSuccess(caption)
  }
  public onUpdateSuccess (caption?: string): void {
    new VueNotify().onUpdateSuccess(caption)
  }
  public onDeleteSuccess (caption?: string): void {
    new VueNotify().onDeleteSuccess(caption)
  }

  public onCreateError (error: object, model?: string): void {
    new VueNotify().onCreateError(error, model)
  }

  public onLoadError (error: object): void {
    new VueNotify().onLoadError(error)
  }

  public onUpdateError (error: object, model?: string): void {
    new VueNotify().onUpdateError(error, model)
  }

  public onDeleteError (error: object, model?: string): void {
    new VueNotify().onDeleteError(error, model)
  }
}

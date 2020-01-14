import Vue from 'vue'

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
}

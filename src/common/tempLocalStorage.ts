interface LocalStorageWithExpiration {
  setItem(key: string, value: string, ttl: number): void
  getItem(key: string): string | null
  removeItem(key: string): void
}

class TemporaryLocalStorage implements LocalStorageWithExpiration {
  private _scheduler: Record<string, NodeJS.Timeout> = {}
  private _scheduleRemoval(key: string, ttl: number) {
    if (this._scheduler[key] !== undefined) {
      clearTimeout(this._scheduler[key])
    }
    this._scheduler[key] = setTimeout(() => {
      this.removeItem(key)
      delete this._scheduler[key]
    }, ttl)
  }
  public setItem(key: string, value: string, ttl: number) {
    const now = new Date()
    const item = {
      value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
    this._scheduleRemoval(key, ttl)
  }
  public getItem(key: string) {
    const itemJSON = localStorage.getItem(key)
    if (!itemJSON) {
      return null
    }
    const item = JSON.parse(itemJSON)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }
  public removeItem(key: string) {
    localStorage.removeItem(key)
  }
}

const TempLocalStorage = new TemporaryLocalStorage()

export default TempLocalStorage

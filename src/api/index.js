import axios from 'axios'
class Base {
  constructor(name = "") {
    if (name.startsWith('/')) name = name.slice(1)
    this.name = name
  }
  formData(url, data) {
    let formData = new FormData();
    for (const name in data) {
      if (data.hasOwnProperty(name)) {
        const item = data[name];
        this.addFormData(formData, name, item);
      }
    }
    return this.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
  post(url, data, config) {
    return this.response(axios.post(this.absoluteURL(url), data, config))
  }
  get(url, config) {
    return this.response(axios.get(this.absoluteURL(url), config))
  }
  absoluteURL(url) {
    if (url.startsWith('/')) url = url.slice(1)
    return `${this.name}/${url}`
  }
  addFormData(formData, name, data) {
    if (Array.isArray(data)) {
      data.forEach(item => {
        this.addFormData(formData, name, item);
      });
    } else {
      formData.append(name, data);
    }
  }
  getURL(url) {
    return axios.defaults.baseURL + `/${this.absoluteURL(url)}`
  }

  response(action) {
    return action.then((res) => res.data)
      .then(({ data, error }) => {
        if (error) {
          return Promise.reject(error);
        } else {
          return Promise.resolve(data);
        }
      })
      .catch((error) => {
        if (!error.code) {
          error = {
            code: "500 error",
            message: error.toString()
          }
        }
        return Promise.reject(error)
      })
  }
}

export default Base

export const Api = new Base()

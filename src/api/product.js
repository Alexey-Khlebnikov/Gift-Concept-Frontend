import Parent from '.'

class API extends Parent {
  create({ name, category, priceUnit, price, detail, images }) {
    let product = {
      name, category, priceUnit, price, detail, productImage: images
    }
    return this.formData("create", product)
  }
}

export default new API("product");

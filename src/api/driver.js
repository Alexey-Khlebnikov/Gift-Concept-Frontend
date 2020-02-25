import Parent from '.'

class API extends Parent {
    register({ name, email, password, commercialRecord, city, neighborhood, branch, country, licenseImage }) {
        console.log({ name, email, password, commercialRecord, city, neighborhood, branch, country, licenseImage })
        let formData = new FormData();
        formData.append('licenseImage', licenseImage);
        formData.append('username', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('commercialRecord', commercialRecord);
        formData.append('city', city);
        formData.append('neighborhood', neighborhood);
        formData.append('branch', branch);
        formData.append('country', country);

        return this.post('register', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    allDrivers() {
        return this.post('allDrivers')
    }
}

export default new API("driver");

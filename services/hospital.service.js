const HospitalRepository = require('../repositories/hospital.repository')
const { Reservation, Hospital } = require('../models/index.js')

class HospitalService {
    hospitalRepository = new HospitalRepository(Reservation, Hospital);
    
    findAllReservation = async ()=> {
        try {
            const data = await this.hospitalRepository.findAllReservation();
            return data;
        } catch (error) {
            throw new Error(error); 
        }
    };

    editReservation = async(id, date, status ) => {
        try {
            const updateReservation = await this.hospitalRepository.editReservation(
                id,
                date, 
                status
            );
            return updateReservation;
        } catch (err) {
            throw err;
        }
    };

}

module.exports = HospitalService;
import MacAddressModel from "../models/MacAddressModel";

const getMacAddress = async (req, res, next) => {
    res.render('MacAddressView');
}
const getCountMac =async (req, res, next) => {
    try {
        const countMac = await MacAddressModel.count();
        // console.log(countAdmin);
        res.send({
            countMac,
        });
        return;
    } catch (error) {
        res.status(404).send();
        return;
    }
}
export default {
    getMacAddress,
    getCountMac
}
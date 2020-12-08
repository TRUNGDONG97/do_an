
import MacAddressModel from "../models/MacAddressModel";
import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op } from "sequelize";
import md5 from "md5";
import DateUtil from "../util/DateUtil";
import excel from "exceljs";
const getMacAddress = async (req, res, next) => {
    res.render('MacAddressView');
}
const getCountMac = async (req, res, next) => {
    try {
        const countMac = await MacAddressModel.count({
            where:{
                is_active:1
            }
        });
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
const getListMacAddress = async (req, res, next) => {
    try {
        const { currentPage } = req.body;
        console.log("currentPage", currentPage);
        const { count, rows } = await MacAddressModel.findAndCountAll({
            where: {
                is_active: 1,
            },
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
        });
        // console.log(rows,"roew");
        var newListMac = [];
        for (let index = 0; index < rows.length; index++) {
            let mac = {};
            mac.id = rows[index].id;
            mac.address_mac = rows[index].address_mac;
            mac.admin_add = rows[index].admin_add;
            mac.create_date = DateUtil.formatInputDate(rows[index].create_date);
            newListMac.push(mac);
        }
        // console.log(newListAdmin, "roew");
        const pageCount = PageCount(count);

        var urlTable = `${process.cwd()}/src/table/MacAdressTable.pug`;
        var htmlTable = pug.renderFile(urlTable, {
            macs: newListMac,
            STT: (currentPage - 1) * Constants.PER_PAGE,
            currentPage,
            pageCount: pageCount,
            pages: getArrayPages(req)(pageCount, currentPage),
        });
        res.send({
            htmlTable,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(404).send();
        return;
    }
}
export default {
    getMacAddress,
    getCountMac,
    getListMacAddress
}
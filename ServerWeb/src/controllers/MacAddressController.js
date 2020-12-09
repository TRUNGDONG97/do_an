
import MacAddressModel from "../models/MacAddressModel";
import Constants from "../util/contant";
import { getArrayPages, PageCount } from "../util/funtions";
import url from "url";
import pug from "pug";
import sequelize, { Op } from "sequelize";
import md5 from "md5";
import DateUtil from "../util/DateUtil";
import excel from "exceljs";
import MacAdress from "../models/MacAddressModel";
import getMAC, { isMAC } from 'getmac'
const getMacAddress = async (req, res, next) => {
    res.render('MacAddressView');
}
const getCountMac = async (req, res, next) => {
    try {
        const countMac = await MacAddressModel.count({
            where: {
                is_active: 1
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
const addMacAddress = async (req, res, next) => {
    const { macAddress } = req.body
    const user_name_create = req.signedCookies.username;
    try {
        const countMacAddress = await MacAddressModel.count({
            where: {
                address_mac: macAddress,
                is_active: 1
            }
        })
        if (countMacAddress > 0) {
            res.send({
                result: 0,
            });
            return;
        }
        await MacAddressModel.create({
            address_mac: macAddress,
            admin_add: user_name_create
        })
        res.send({
            result: 1,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(404).send();
        return;
    }

}
const deleteMac = async (req, res, next) => {
    const id = parseInt(req.body.id);
    // console.log(id)
    try {
        const mac_address = await MacAddressModel.findAll({
            where: {
                id,
                is_active: 1,
            },
        });
        // console.log(students.length)
        if (mac_address.length > 0) {
            await MacAddressModel.update(
                {
                    is_active: 0,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            res.send({
                result: 1,
            });
        } else {
            res.send({
                result: 0, //Notfound
            });
        }
        return;
    } catch (error) {
        res.status(404).send();
        return;
    }
}
const editMacAddress = async (req, res, next) => {
    const { macAddress, id } = req.body
    // console.log(id)
    const mac_address = await MacAddressModel.findAll({
        where: {
            id,
            is_active: 1,
        },
    });
    if (mac_address.length < 1) {
        res.send({
            result: 0, //Notfound
        });
        return;
    }
    if (macAddress != mac_address[0].address_mac) {
        const countMacAddress = await MacAddressModel.count({
            where: {
                is_active: 1,
                address_mac: macAddress
            }
        })
        if (countMacAddress > 0) {
            res.send({
                result: 1,
            });
            return;
        }
    }

    await MacAddressModel.update(
        {
            address_mac: macAddress
        }, {
        where: {
            id
        }
    })
    // console.log("newAdmin", newAdmin);
    res.send({
        result: 2,
    });
    try {
        const mac_address = await MacAddressModel.findAll({
            where: {
                id,
                is_active: 1,
            },
        });
        // console.log(students.length)


    } catch (error) {
        res.status(404).send();
        return;
    }
}
const getMacOnServer = async (req, res, next) => {
    try {
        var macAddress = await getMAC()
        res.send({
            macAddress
        });
    } catch (error) {
        res.status(404).send();
        return;
    }
}
export default {
    getMacAddress,
    getCountMac,
    getListMacAddress,
    addMacAddress,
    deleteMac,
    editMacAddress,
    getMacOnServer
}
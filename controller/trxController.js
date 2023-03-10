'use strict';
const response = require('../config/res');
const trxModel = require('../model/trxModel');
const trxDetailModel = require('../model/trxDetailModel');
const db = require('../config/connection');
const { QueryTypes } = require('sequelize');

const generateTrxNumber = async (todayDate) => {
  try {
    let seq = 0;
    const param = todayDate.split("-");
    const getData = await db.query(
      "SELECT MAX(RIGHT(LEFT(a.trx_number, 9),3)) as seq " +
      "FROM  trx a " +
      "WHERE DAY(a.createdAt) = :day " +
      "AND MONTH(a.createdAt) = :month " + 
      "AND YEAR(a.createdAt) = :year ",
      {
        replacements: { day: param[2], month: param[1], year: param[0] },
        type: QueryTypes.SELECT
      }
    );
    // console.log(getData);
    if (getData[0].seq !== null) {
      seq = parseInt(getData[0].seq);
      seq++
      seq = seq.toString().padStart(3, '0');
      return param[0].slice(-2) + param[1] + param[2] + seq;
    } else {
      seq++
      seq = seq.toString().padStart(3, '0');
      return param[0].slice(-2) + param[1] + param[2] + seq;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

const methodPost = async (req, res) => {
  try {
    let { customer_name, seat, note, payment, product } = req.body;
    note = note ? note : null;
    const todayDate = new Date().toISOString().slice(0, 10);
    const trx_number = await generateTrxNumber(todayDate);
    const store = new trxModel({
      trx_number, customer_name, seat, note, payment
    })
    await store.save();
    for (let i = 0; i < product.length; i++) {
      const storeDetail = new trxDetailModel({
        trx_number, qty: product[i].qty, id_product: product[i].id_product
      })
      await storeDetail.save();
    }
    response.ok(res, true, "Pesanan berhasil dibuat", 201);
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

// const methodGet = async (req, res) => {
//   try {
//     const getData = await categoryModel.findAll({
//       where: {
//         is_delete: 0
//       }
//     });
//     response.ok(res, true, "Data tersedia", 200, getData)
//   } catch (err) {
//     console.error(err)
//     response.ok(res, false, "error", 400, err)
//   }
// }

// const methodGetId = async (req, res) => {
//   try {
//     const id = req.params.id
//     const getData = await categoryModel.findOne({
//       where: { id: id }
//     });
//     if (getData) {
//       response.ok(res, true, "Data tersedia", 200, getData)
//     } else {
//       response.ok(res, false, "Data tidak tersedia", 404, getData)
//     }
//   } catch (err) {
//     console.error(err)
//     response.ok(res, false, "error", 400, err)
//   }
// }

// const methodDelete = async (req, res) => {
//   try {
//     const { id } = req.body;

//     const deleteCategory = categoryModel.update({
//       is_delete: 1
//     }, {
//       where: { id: id }
//     })
//     await deleteCategory;
//     response.ok(res, true, "Category berhasil dihapus", 200);
//   } catch (err) {
//     console.error(err)
//     response.ok(res, false, "error", 400, err)
//   }
// }

// const methodUpdate = async (req, res) => {
//   try {
//     const { id, category_name } = req.body;

//     const updateCategory = categoryModel.update({
//       category_name
//     }, {
//       where: { id }
//     })
//     await updateCategory;
//     response.ok(res, true, "Category berhasil diupdate", 200);
//   } catch (err) {
//     console.error(err)
//     response.ok(res, false, "error", 400, err)
//   }
// }

// const dataCategoryAndProduct = async (req, res) => {
//   try {
//     const getData = await db.query(
//       "SELECT `b`.`id` AS `id_product`, `b`.`product_name`, `b`.`product_desc`, " +
//       "`b`.`price`, `b`.`image`, `a`.`id` AS `id_category`, `a`.`category_name` " +
//       "FROM  `category` `a` LEFT JOIN `product` `b` ON `b`.`id_category` = `a`.`id` " + 
//       "WHERE `a`.`is_delete` = 0 AND `b`.`available` = 1",
//       {
//         type: QueryTypes.SELECT
//       }
//     );
  
//     const mappedData = getData.reduce((acc, current) => {
//       const categoryIndex = acc.findIndex(item => item.id_category === current.id_category);
  
//       if (categoryIndex !== -1) {
//         acc[categoryIndex].product.push({
//           id_product: current.id_product,
//           product_name: current.product_name,
//           product_desc: current.product_desc,
//           price: current.price,
//           image: current.image
//         });
//       } else {
//         acc.push({
//           id_category: current.id_category,
//           category_name: current.category_name,
//           product: [
//             {
//               id_product: current.id_product,
//               product_name: current.product_name,
//               product_desc: current.product_desc,
//               price: current.price,
//               image: current.image
//             }
//           ]
//         });
//       }
  
//       return acc;
//     }, []);
  
//     // console.log(mappedData);
//     response.ok(res, true, "Data tersedia", 200, mappedData)
//   } catch (err) {
//     console.error(err);
//   }
// }

module.exports = {
  methodPost,
  // methodGet,
  // methodGetId,
  // methodDelete,
  // methodUpdate,
  // dataCategoryAndProduct
}

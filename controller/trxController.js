'use strict';
const response = require('../config/res');
const trxModel = require('../model/trxModel');
const productModel = require('../model/productModel');
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

const totalPrice = async (dataArray) => {
  const productIdArray = dataArray.map((item) => item.id_product);
  const products = await productModel.findAll({
    where: {
      id: productIdArray
    }
  });
  let total = 0;
  products.forEach((product) => {
    const productInfo = dataArray.find((item) => item.id_product === product.id);
    total += product.price * productInfo.qty;
  });
  
  return total;
}

const productCheck = async (dataArray) => {
  const productIdArray = dataArray.map((item) => item.id_product);
  const products = await productModel.findAll({
    where: {
      id: productIdArray
    }
  });
  if (products.length === dataArray.length) {
    return true
  } else {
    return false
  }
}

const methodPost = async (req, res) => {
  try {
    let { customer_name, seat, note, product } = req.body;
    note = note ? note : null;
    const isReady = await productCheck(product);
    if (isReady) {
      const payment = await totalPrice(product);
      
      const todayDate = new Date().toISOString().slice(0, 10);
      const trx_number = await generateTrxNumber(todayDate);
      // Simpan data transaksi ke tabel trx
      const store = await trxModel.create({
        trx_number,
        customer_name,
        seat,
        note,
        payment,
      });
  
      // Buat array untuk menyimpan data trx_detail
      const trxDetails = product.map((item) => ({
        qty: item.qty,
        id_product: item.id_product,
        id_trx: store.id,
      }));
  
      // Simpan semua data trx_detail sekaligus
      await trxDetailModel.bulkCreate(trxDetails);
  
      response.ok(res, true, "Pesanan berhasil dibuat", 201, {trx_number});
    } else {
      response.ok(res, false, "Menu tidak tersedia", 400)
    }
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const methodGet = async (req, res) => {
  try {
    const getData = await trxModel.findAll({
      where: {
        is_buy: 0
      }
    });
    response.ok(res, true, "Data tersedia", 200, getData)
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

const methodGetId = async (req, res) => {
  try {
    const id = req.params.id
    const getData = await db.query(
      "SELECT a.*, b.id AS id_detail, b.qty, " +
      "c.product_name, c.price, c.image " +
      "FROM  trx a LEFT JOIN trx_detail b ON b.id_trx = a.id " +
      "LEFT JOIN product c ON c.id = b.id_product " +
      "WHERE b.is_delete = 0 AND a.id = :id",
      {
        replacements: { id },
        type: QueryTypes.SELECT
      }
    );

    const result = getData.reduce((acc, curr) => {
      const { id_detail, qty, product_name, price, image, ...rest } = curr;
      if (!acc.id) {
        acc = { ...rest, detail: [] };
      }
      acc.detail.push({ id_detail, qty, product_name, price, image });
      return acc;
    }, {});

    response.ok(res, true, "Data tersedia", 200, result)
  } catch (err) {
    console.error(err);
  }
}

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

const updatePayment = async (req, res) => {
  try {
    const id_user = req.auth.id_user;
    const { id, is_buy } = req.body;
    const queryUpdatePayment = trxModel.update({
      is_buy, id_kasir: id_user
    }, {
      where: { id }
    })
    await queryUpdatePayment;
    response.ok(res, true, "Pembayaran berhasil", 200);
  } catch (err) {
    console.error(err)
    response.ok(res, false, "error", 400, err)
  }
}

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
  methodGet,
  methodGetId,
  updatePayment
  // methodDelete,
  // methodUpdate,
  // dataCategoryAndProduct
}

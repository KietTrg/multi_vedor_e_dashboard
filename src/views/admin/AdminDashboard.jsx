import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosApps } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi";
import Chart from 'react-apexcharts'
import logo_admin from '../../assets/admin.jpg'
import avata_seller from '../../assets/avata_seller.jpg'
import { get_admin_dashboard } from '../../store/Reducers/dashboardReducer';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { formatMoney } from '../../store/helpers';
const AdminDashboard = () => {
  const { userInfo } = useSelector(state => state.auth)
  console.log('userInfo: ', userInfo);
  const dispatch = useDispatch()
  const { totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrders,
    recentMessage,
    resultMoney,
    resultOrder,
    resultSeller,

  } = useSelector(state => state.dashboard)
  console.log('recentMessage: ', recentMessage);
  useEffect(() => {
    dispatch(get_admin_dashboard())
  }, [])
  const state = {
    series: [
      {
        name: "Orders",
        data: resultOrder
      },
      {
        name: "Revenue (1/1000)",
        data: resultMoney
      },
      {
        name: "Seller",
        data: resultSeller
      },
    ],
    options: {
      colors: ['#DC8686', '#F0DBAF', '#7ED7C1'],
      // color: ['#181ee8','#181ee8'],
      plotOptions: {
        bar: {
          borderRadius: 5,
        }
      },
      chart: {
        background: "transparent",
        foreColor: '#000'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        color: "#f0f0f0",
        with: .5,
        dashArray: 0
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],

      },
      legend: {
        position: 'top'
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              'Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              }
            },
            chart: {
              height: '550px'
            }
          }
        }
      ]
    }
  }
  return (
    <div className='px-2 md:px-7 py-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
        <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-3xl font-bold'>{formatMoney(totalSale)}đ</h2>
            <span className='text-md font-medium'>Total Sale</span>
          </div>
          <div className='w-[54px] h-[54px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl'>
            <span className='text-[#28c76f]'>VNĐ</span>
          </div>
        </div>
        <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-3xl font-bold'>{totalProduct}</h2>
            <span className='text-md font-medium'>Products</span>
          </div>
          <div className='w-[54px] h-[54px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl'>
            <IoIosApps className='text-[#cd00e8]' size={25} />
          </div>
        </div>
        <Link to='/admin/dashboard/sellers' className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-3xl font-bold'>{totalSeller}</h2>
            <span className='text-md font-medium'>Sellers</span>
          </div>
          <div className='w-[54px] h-[54px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl'>
            <LuUsers className='text-[#00cfe8]' size={25} />
          </div>
        </Link>
        <Link to='/admin/dashboard/order' className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start '>
            <h2 className='text-3xl font-bold'>{totalOrder}</h2>
            <span className='text-md font-medium'>Orders</span>
          </div>
          <div className='w-[54px] h-[54px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl'>
            <HiOutlineDocumentText className='text-[#7367f0]' size={25} />
          </div>
        </Link>
      </div>
      <div className=' w-full flex flex-wrap mt-7'>
        <div className=' w-full lg:w-7/12 lg:pr-3'>
          <div className='w-full bg-white shadow-md p-4 rounded-md'>
            <Chart options={state.options} series={state.series} type='bar' height={350} />
          </div>
        </div>
        <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
          <div className=' w-full bg-white shadow-md p-4 rounded-md'>
            <div className='flex justify-between items-center'>
              <h2 className='pb-3 font-semibold text-lg '>Recent seller message</h2>
              <Link to='/admin/dashboard/chat-seller' className='font-semibold text-sm hover:text-[#CD8D7A]'>View All</Link>
            </div>
            <div className='flex flex-col gap-2 pt-6 '>
              <ol className='relative border-1  ml-4' >
                {
                  recentMessage.map((el, i) =>
                    <li className='mb-3 ml-6'>
                      <div className='flex absolute -left-5  justify-center items-center w-10 h-10 p-[2px] rounded-full z-10'>
                        {
                          el.senderId === '' ? <img className='w-full h-full rounded-full ' src={logo_admin} alt="" /> : <img className='w-full h-full rounded-full ' src={avata_seller} alt="" />
                        }
                      </div>
                      <div className='p-3 bg-white shadow-md rounded-lg border border-[#3a4d39]'>
                        <div className='flex justify-between items-center mb-2' >
                          <Link className='text-md font-normal'>{el.senderName}</Link>
                          <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>{moment(el.createdAt).fromNow()}</time>
                        </div>
                        <div className='p-2 text-xs font-normal rounded-md bg-[#D0E7D2]'>
                          {el.message}
                        </div>
                      </div>
                    </li>

                  )
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full p-4  bg-white shadow-md rounded-md mt-6'>
        <div className='flex justify-between items-center'>
          <h2 className='pb-3 font-semibold text-lg '>Recent Order</h2>
          <Link to='/admin/dashboard/order' className='font-semibold text-sm hover:text-[#CD8D7A]'>View All</Link>
        </div>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left '>
            <thead className='text-sm  uppercase border-b border-[#3a4d39]'>
              <tr>
                <th scope='col' className='py-3 px-4'>Order Id</th>
                <th scope='col' className='py-3 px-4'>Price <i className=' font-medium text-xs'>(Vnđ)</i></th>
                <th scope='col' className='py-3 px-4'>Payment Status</th>
                <th scope='col' className='py-3 px-4'>Order Status</th>
                <th scope='col' className='py-3 px-4'>Active</th>
              </tr>
            </thead>
            <tbody>
              {
                recentOrders.map((el, key) => <tr key={key}>
                  <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'>#{el._id}</td>
                  <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'>{formatMoney(el?.price)}</td>
                  <td scope='row' className={`py-3 px-4 font-normal whitespace-nowrap ${el.paymentStatus === 'paid' ? 'text-green-700' : 'text-red-700'}`}><span>{el.paymentStatus}</span></td>
                  <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'><span>{el.deliveryStatus}</span></td>
                  <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap hover:text-green-500 transition-all duration-300'><Link to={`/admin/dashboard/order/details/${el?._id}`}>view</Link></td>
                </tr>)
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
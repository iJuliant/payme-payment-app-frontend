import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import SideNav from "components/SideNav";
import styles from "../../styles/Transfer.module.css";
import { authPage } from "middleware/AuthorizationPage";
import Cookie from "js-cookie";

// import cookies from "next-cookies";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  axios.setToken(data.token);

  const user = await axios.axiosApiIntances
    .get(`user/by-id/${data.user}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response);
      return {};
    });

  const balance = await axios.axiosApiIntances
    .get("transaction/balance")
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return "Loading...";
    });

  return {
    props: { user, balance },
  };
}

export default function Transfer(props) {
  const router = useRouter();
  axios.setToken(Cookie.get("token"));
  const userBalance = props.balance;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;
  const [sort, setSort] = useState("user_name ASC");
  const [pagination, setPagination] = useState({});
  const [receiverData, setReceiverData] = useState({});
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(0);
  const [inputAmount, setInputAmount] = useState(false);
  const [note, setNote] = useState("");
  const [showAlert, setShowAlert] = useState([false, ""]);

  useEffect(() => {
    if (search) {
      axios.axiosApiIntances
        .get(`user?page=${page}&limit=${limit}&keywords=${search}&sort=${sort}`)
        .then((res) => {
          // console.log(res.data);
          setData(res.data.data);
          setPagination(res.data.pagination);
          router.push(
            `/transfer?page=${page}&limit=${limit}&keywords=${search}&sort=${sort}`
          );
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      setData([]);
      setPagination({});
    }
  }, [search, page, sort]);

  const goToSetAmount = (id) => {
    console.log("receiverID", id);
    axios.axiosApiIntances
      .get(`user/by-id/${id}`)
      .then((res) => {
        // console.log("receiver", res.data.data[0]);
        setReceiverData(res.data.data[0]);
        setInputAmount(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleAmount = (event) => {
    // console.log(event.target.value);
    if (/^\d+$/.test(event.target.value)) {
      if (parseInt(event.target.value) > userBalance) {
        setAmount(0);
        setShowAlert([true, "Not enough balance"]);
      } else {
        if (parseInt(event.target.value) > userBalance) {
          setAmount(0);
          setShowAlert([true, "Not enough balance"]);
        } else {
          setAmount(parseInt(event.target.value));
        }
      }
    } else {
      setAmount(0);
      setShowAlert([true, "Please enter numbers only!"]);
      setTimeout(() => {
        setShowAlert([false, ""]);
      }, 1000);
    }
  };

  const goToConfirmation = () => {
    if (amount === 0) {
      setShowAlert([true, "Please input your amount correctly !"]);
    } else {
      Cookie.set("amount", amount, {
        expires: 1,
        secure: true,
      });
      Cookie.set("note", note, {
        expires: 1,
        secure: true,
      });
      router.push(`/confirmation/${receiverData.user_id}`);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  // console.log("server", typeof userBalance);
  // console.log(typeof userBalance);
  return (
    <Layout title="Transfer">
      <Navbar user={props.user} />

      <div className="container mt-5 pt-5 mb-5 pb-5">
        <div className="row mt-4">
          <div className={`${styles.breakPoints} col-sm-3`}>
            <SideNav />
          </div>
          <div className="col">
            {/* <div className={`${styles.breakPointsRev}`}>
              <UpperNav />
            </div> */}
            {!inputAmount ? (
              <div className={`${styles.box} shadow p-4`}>
                <div className={`${styles.miniTitle} mt-3`}>
                  Search Receiver
                </div>
                <div className="text-end">
                  <span>Sort By</span>
                  <select
                    className={styles.dropDown}
                    onChange={(event) => {
                      setSort(event.target.value);
                    }}
                  >
                    <option value="user_name ASC">name A-z</option>
                    <option value="user_name DESC">name Z-a</option>
                  </select>
                </div>
                <input
                  type="email"
                  className={`form-control mt-2 mb-4 ${styles.input}`}
                  placeholder="Search receiver here"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <div className={styles.resultBox}>
                  {data.length > 0 ? (
                    data.map((item, index) => {
                      if (item.user_id != props.user.user_id) {
                        return (
                          <div className=" d-flex mb-3" key={index}>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                goToSetAmount(item.user_id);
                              }}
                            >
                              {item.user_image.length > 0 ? (
                                <img
                                  src={`${process.env.IMG_BACKEND_URL}${item.user_image}`}
                                  className={styles.pp}
                                />
                              ) : (
                                <Image
                                  src="/no-img.png"
                                  alt="Top up"
                                  width={55}
                                  height={55}
                                  className={styles.noPP}
                                  layout="fixed"
                                />
                              )}
                            </div>
                            <div>
                              <div className={`${styles.receiverName} ms-3`}>
                                {item.user_name}
                              </div>
                              <div className={`${styles.type} ms-3`}>
                                {item.user_phone}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return "";
                      }
                    })
                  ) : (
                    <div
                      className={`${styles.noData} row align-items-center mx-auto`}
                    >
                      <div className="col">No Data</div>
                    </div>
                  )}
                </div>
                {data.length > 0 ? (
                  <div className="mt-3 d-flex justify-content-center">
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={
                        pagination.totalPage ? pagination.totalPage : 0
                      }
                      marginPagesDisplayed={5}
                      pageRangeDisplayed={5}
                      onPageChange={handlePageClick}
                      containerClassName={styles.pagination}
                      subContainerClassName={`${styles.pages} ${styles.pagination}`}
                      activeClassName={styles.active}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className={`${styles.box} shadow p-4`}>
                <div className={`${styles.miniTitle} mt-3`}>Transfer Money</div>
                <div
                  className=" d-flex mt-4 ms-2 mb-4 shadow p-2"
                  style={{ borderRadius: "8px" }}
                >
                  <div>
                    {receiverData.user_image ? (
                      <img
                        src={`${process.env.IMG_BACKEND_URL}${receiverData.user_image}`}
                        className={styles.pp}
                      />
                    ) : (
                      <Image
                        src="/no-img.png"
                        alt="Top up"
                        width={55}
                        height={55}
                        className={styles.noPP}
                        layout="fixed"
                      />
                    )}
                  </div>
                  <div>
                    <div className={`${styles.receiverName} ms-3`}>
                      {receiverData.user_name}
                    </div>
                    <div className={`${styles.type} ms-3`}>
                      {receiverData.user_phone}
                    </div>
                  </div>
                </div>
                <div className={styles.type} style={{ width: "45%" }}>
                  Type the amount you want to transfer and then press continue
                  to the next steps.
                </div>
                <div className="text-center mt-3">
                  {showAlert[0] ? (
                    <div className={styles.alert}>{showAlert[1]}</div>
                  ) : (
                    ""
                  )}
                  <input
                    className={`${styles.inputLg} form-control text-center mx-auto mb-2`}
                    type="text"
                    placeholder="0.00"
                    onChange={(event) => {
                      handleAmount(event);
                    }}
                  />
                  <div className={styles.miniTitle}>
                    Rp{userBalance.toLocaleString()} Available
                  </div>
                  <div
                    className="input-group mt-4 mx-auto"
                    style={{ width: "343px" }}
                  >
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-pencil-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add some notes"
                      aria-describedby="basic-addon1"
                      onChange={(event) => {
                        setNote(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row-reverse mt-5">
                  <button
                    type="button"
                    className={`${styles.btnContinune} btn btn-primary btn-lg`}
                    onClick={goToConfirmation}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </Layout>
  );
}
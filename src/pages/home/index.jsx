import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  InputGroup,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import { toast } from "react-toastify";

function HomePage() {
  const [debts, setDebts] = useState([]);
  const [debt, setDebt] = useState({
    fromTo: "",
    fullName: "",
    phoneNumber: "",
    amount: null,
    until: "",
  });
  const [selected, setSelected] = useState(null);
  const [transaction, setTransaction] = useState({
    fromTo: "",
    fullName: "",
    amount: null,
  });
  const [transactions, setTransactions] = useState([]);
  const [val, setVal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cat, setCat] = useState(null);

  const handleClose = () => {
    setShowModal(false)
    setTransaction({
        fromTo: "",
        fullName: "",
        amount: 0,
      });
      setDebt({
        fromTo: "",
        fullName: "",
        phoneNumber: "",
        amount: 0,
        until: "",
      });
};
  const handleShow = () => setShowModal(true);
  const handleDebt = (e) => {
    setDebt({ ...debt, [e.target.id]: e.target.value, id: Date.now() });
  };
  const handleTransaction = (e) => {
    setTransaction({
      ...transaction,
      [e.target.id]: e.target.value,
      id: Date.now(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setVal(true);
    } else {
        if (cat === "debt" && selected === null) {
          setDebts([...debts, debt]);
        } else if (cat === "transaction" && selected === null) {
          setTransactions([...transactions, transaction]);
        } else if (cat === "debt" && selected !== null) {
          const newArrDebts = debts.filter((item) => item.id !== selected);
          setDebts([...newArrDebts, debt]);
          setSelected(null);
        } else if (cat === "transaction" && selected !== null) {
          const newArrTransactions = transactions.filter(
            (item) => item.id !== selected
          );
          setTransactions([...newArrTransactions, transaction]);
        }
    }
    setVal(false);
    toast.success("Added successfully");
    handleClose();
  };
  const deleteItem = (cat, id) => {
    console.log(id);
    if (cat === "debt") {
      const newDebts = debts.filter((debt) => debt.id !== id);
      setDebts(newDebts);
    } else {
      const newTransactions = transactions.filter((debt) => debt.id !== id);
      setTransactions(newTransactions);
    }
  };
  const editItem = (cat, id) => {
      handleShow();
    if (cat === "debt") {
      const changingDebt = debts.find((debt) => debt.id === id);
      setDebt({
        fromTo: changingDebt.fromTo,
        fullName: changingDebt.fullName,
        phoneNumber: changingDebt.phoneNumber,
        amount: changingDebt.amount,
        until: changingDebt.until,
      });
    } else {
      const changingTransaction = transactions.find((trans) => trans.id === id);
      setTransaction({
        fromTo: changingTransaction.fromTo,
        fullName: changingTransaction.fullName,
        amount: changingTransaction.amount,
      });
      console.log(changingTransaction);
    }
  };
  return (
    <section>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cat === "debt" ? "Add debt" : "Add transaction"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={val}
            className="d-flex flex-column gap-2"
            onSubmit={handleSubmit}
          >
            <Form.Group className="d-flex gap-3" controlId="fromTo">
              <Form.Check
                name="who"
                value="from"
                onChange={(e) =>
                  cat === "debt" ? handleDebt(e) : handleTransaction(e)
                }
                type="radio"
                label="From"
                checked={
                  debt.fromTo === "from" || transaction.fromTo === "from"
                }
              />
              <Form.Check
                name="who"
                value="to"
                onChange={(e) =>
                  cat === "debt" ? handleDebt(e) : handleTransaction(e)
                }
                checked={debt.fromTo === "to" || transaction.fromTo === "to"}
                type="radio"
                label="To"
              />
            </Form.Group>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                value={cat === "debt" ? debt.fullName : transaction.fullName}
                onChange={(e) =>
                  cat === "debt" ? handleDebt(e) : handleTransaction(e)
                }
                type="text"
                placeholder="Full name"
              />
            </Form.Group>
            {cat === "debt" ? (
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={debt.phoneNumber}
                  required
                  onChange={(e) => handleDebt(e)}
                  type="tel"
                  placeholder="Phone number"
                />
              </Form.Group>
            ) : null}
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  value={cat === "debt" ? debt.amount : transaction.amount}
                  required
                  onChange={(e) =>
                    cat === "debt" ? handleDebt(e) : handleTransaction(e)
                  }
                  type="number"
                  placeholder="Amount"
                />
              </InputGroup>
            </Form.Group>
            {cat === "debt" ? (
              <Form.Group controlId="until">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  value={debt.until}
                  required
                  onChange={(e) => handleDebt(e)}
                  type="date"
                />
              </Form.Group>
            ) : null}
            <Button variant="primary" type="submit">
              {selected === null ? "Add" : "Save"}{" "}
              {cat === "debt" ? "Debt" : "Transaction"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="container">
        <div className="wrapper">
          <header className="border-bottom mb-3 px-5 py-1">
            <h1>Cardmon</h1>
          </header>
          <Tabs className="px-5">
            <Tab eventKey="debts" title="Debts">
              <div className="header d-flex justify-content-between p-1 mt-3">
                <h3>All debts</h3>
                <Button
                  onClick={() => {
                    handleShow();
                    setCat("debt");
                  }}
                >
                  Add debt
                </Button>
              </div>
              <div className="mt-3">
                {debts.map((debt) => (
                  <Alert
                    className="d-flex justify-content-between align-items-center gap-2 flex-wrap"
                    key={debt.id}
                    variant={debt.fromTo === "from" ? "danger" : "success"}
                  >
                    <p className="mb-0">
                      {debt.fromTo === "from" ? "From" : "To"}: {debt.fullName}
                    </p>
                    <p className="mb-0">Amount: ${debt.amount}</p>
                    <p className="mb-0">Phone: {debt.phoneNumber}</p>
                    <p className="mb-0">Until: {debt.until}</p>
                    <div className="d-flex gap-1">
                      <Button
                        className="btn btn-danger"
                        onClick={() => deleteItem("debt", debt.id)}
                      >
                        Del
                      </Button>
                      <Button
                        className="btn"
                        onClick={() => {
                          editItem("debt", debt.id);
                          setSelected(debt.id);
                          setCat('debt')
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </Alert>
                ))}
              </div>
            </Tab>
            <Tab eventKey="transactions" title="Transactions">
              <div className="header d-flex justify-content-between p-1 mt-3">
                <h3>All transactions</h3>
                <Button
                  onClick={() => {
                    handleShow();
                    setCat("transaction");
                  }}
                >
                  Add transaction
                </Button>
              </div>
              <div className="mt-3">
                {transactions.map((transaction, i) => (
                  <Alert
                    className="d-flex justify-content-between align-items-center gap-2 flex-wrap"
                    key={transaction.fromTo}
                    variant={
                      transaction.fromTo === "from" ? "success" : "danger"
                    }
                  >
                    <p className="mb-0">
                      {transaction.fromTo === "from" ? "From" : "To"}:{" "}
                      {transaction.fullName}
                    </p>
                    <p className="mb-0">Amount: ${transaction.amount}</p>
                    <Button
                      className="btn btn-danger"
                      onClick={() => deleteItem("transaction", transaction.id)}
                    >
                      Del
                    </Button>
                    <Button
                      className="btn"
                      onClick={() => {
                        editItem("transaction", transaction.id);
                        setSelected(transaction.id);
                        setCat('transaction')
                      }}
                    >
                      Edit
                    </Button>
                  </Alert>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default HomePage;

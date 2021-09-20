import React, { useState } from "react";
import RefundIntro from "./RefundIntro";
import RefundChoices from "./RefundChoices";
import RefundPaypal from "./RefundPayPal";
import { refundPages } from "./RefundPagesEnum";
import RefundLater from "../Success/RefundLater";
import RefundBank from "./RefundBank";

function Refund({ page }) {
  const [chosenPage, setChosenPage] = useState(page);

  function selectPage(page) {
    setChosenPage(page);
  }

  function chosenRefundPage() {
    switch (chosenPage) {
      case refundPages.EMAIL:
        return <RefundIntro selectPage={selectPage} />;
      case refundPages.CHOICES:
        return <RefundChoices selectPage={selectPage} />;
      case refundPages.PAYPAL:
        return <RefundPaypal selectPage={selectPage} />;
      case refundPages.BANK:
        return <RefundBank selectPage={selectPage} />;
      case refundPages.LATER:
        return <RefundLater />;
      default:
        return <RefundIntro selectPage={selectPage} />;
    }
  }

  return chosenRefundPage();
}

export default Refund;

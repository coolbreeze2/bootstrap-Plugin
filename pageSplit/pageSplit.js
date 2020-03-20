$(document).ready(function () {
	// You should bind events when the document is loaded
    pageSplitBind(function (spanNo) {
		console.log(spanNo);
    }, 20);
});
/**
 * page split event Bind
 * @param callbackFuc
 * @param maxPage
 */
function pageSplitBind(callbackFuc, maxPage = 20) {
    $("li[data-page-control]").click(function () {
        let maxNo = maxPage,
            lis = $("li[data-page-control]"),
            liLen = lis.length,
            maxLen = liLen - 4,
            firstSpanNo = parseInt($(lis[2]).children().text()),
            lastSpanNo = parseInt($(lis[maxLen - 2]).children().text());

        function switchPage(minus, maxNo) {
            let isPrev = true,
                ii = maxLen,
                jj = 0,
                isFirstPage = false,
                isLastPage = false,
                firstArray = [...Array(maxLen)].map(_ => ++jj),
                lastArray = [...Array(maxLen)].map(_ => maxNo - --ii);
            if (clickedSpanNo === "‹") {
                if (activeNoInt < minus) {
                    return;
                }
            }
            if (clickedSpanNo === "«") {
                if (activeNoInt <= 2 * minus) {
                    if (firstSpanNo !== 1) isFirstPage = true;
                    else return;
                }
            }
            if (clickedSpanNo === "›") {
                isPrev = false;
                if (activeNoInt + minus > maxNo) {
                    return;
                }
            }
            if (clickedSpanNo === "»") {
                isPrev = false;
                if (activeNoInt + minus * 2 > maxNo) {
                    if (lastSpanNo !== maxNo) isLastPage = true;
                    else return;
                }
            }
            $("li[data-page-control]").each(function (index, item) {
                if (index > 1 && index < maxLen + 2) {
                    let thisNo = parseInt($(item).children().text());
                    if (isPrev) {
                        let textValue = "";
                        if (isFirstPage) textValue = firstArray[index - 2];
                        else textValue = thisNo - minus;
                        $(item).children().text(textValue);
                    } else {
                        let textValue = "";
                        if (isLastPage) textValue = lastArray[index - 2];
                        else textValue = thisNo + minus;
                        $(item).children().text(textValue);
                    }
                }
            });
            activeNoAfter = parseInt($(activeLi).children().text());
            callbackFuc(activeNoAfter);
        }

        let activeLi = $("li[data-page-control][class=active]"),
            prevSpan = $(activeLi).prev().children().text(),
            nextSpan = $(activeLi).next().children().text(),
            activeNoInt = parseInt($(activeLi).children().text()),
            activeNoAfter = activeNoInt,
            clickedSpanNo = $(this).children().text();

        let clickedSpanNoInt = parseInt(clickedSpanNo);
        if (clickedSpanNoInt === activeNoInt) return;

        if (clickedSpanNo === "«" || clickedSpanNo === "»") {
            switchPage(maxLen, maxNo);
            return;
        }

        if (clickedSpanNo === "‹") {       // prev span
            if (prevSpan === "‹") {
                switchPage(1, maxNo);
                return;
            }
            activeNoAfter -= 1;
            activeLi.removeClass("active");
            activeLi.prev().addClass("active");
        } else if (clickedSpanNo === "›") { // next span
            if (nextSpan === "›") {
                switchPage(1, maxNo);
                return;
            }
            activeNoAfter += 1;
            activeLi.removeClass("active");
            activeLi.next().addClass("active");
        } else {
            activeNoAfter = clickedSpanNoInt;
            activeLi.removeClass("active");
            $(this).addClass("active");
        }
        callbackFuc(activeNoAfter);
    });
}
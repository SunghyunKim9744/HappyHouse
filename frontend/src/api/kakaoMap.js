import { API_KAKAO_MAP_URL } from "@/config";

const cheerio = require("cheerio");
const axios = require("axios");
// 본인 appkey
const appkey = "b3c2bdb169713d0a555a224b07174af7";

// 카카오 지도 api 라이브러리 불러오기(지도 보일 컴포넌트 mounted에 쓰면됩니다.)
// ex) <script src = "카카오맵라이브러리"></script>
function load() {
  // 이미 라이브러리 불러왔다면 지도 그리기.
  if (window.kakao && window.kakao.maps) {
    displayMap();
  } else {
    const script = document.createElement("script");
    console.log(`${API_KAKAO_MAP_URL}`);
    script.src = `${API_KAKAO_MAP_URL}appkey=${appkey}&libraries=services&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => kakao.maps.load(displayMap());
  }
}
let map;
// 지도 생성(검색하지 않았을 때)
function displayMap() {
  // 초기 kakao map 설정 start
  map;
  //지도를 담을 영역의 DOM 레퍼런스
  // 지도를 그릴 노드 선택하시면 됩니다.
  const container = document.querySelector(".map-container");

  kakao.maps.load(function() {
    // 지도의 중심좌표(위,경도)
    // 마음에 드는 곳으로 위경도 바꾸셔도됩니다.
    const locPosition = new kakao.maps.LatLng(37.5012743, 127.039585); // (멀티캠퍼스)
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: locPosition, //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 지도를 중심좌표로 옮기기
    map.setCenter(locPosition);

    // 결과값으로 받은 위치를 마커로 표시합니다
    marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });
  });
}

// 위,경도 좌표넣기 위한 변수
let positions = [];

// 지역을 검색한 결과로 지도 그리기
// 검색하고 난 후, 검색결과를 인자로 주어서 주소로 위,경도 구한 후 지도 그리기
// 전 houses를 Map 자료구조로 줬는데 배열로 줘도 됩니다!
// watch 또는 computed에서 사용하면 됩니다.
function makeMap(houses, imgs) {
  // 주소를 위,경도로 변환하기 위한 객체
  let geocoder = new kakao.maps.services.Geocoder();
  // 기존에 검색했던 위,경도 초기화
  positions = [];

  // 여기서 전 Map 자료구조 써서 이터레이터 구했는데, 배열로 하면 이럴필요 없습니다.
  let itr = houses.keys();
  let key = "";

  // geocoder.addressSearch가 비동기라서, 검색 결과 개수만큼 반복했을 때, 지도를 그리기 위한 변수
  let cnt = 0;

  // 검색 결과 개수만큼 반복
  // 마찬가지로 배열이라면 for문 돌리셔도 됩니다.
  while ((key = itr.next().value)) {
    // 아파트
    let apt = houses.get(key)[0];

    // 아파트의 주소(도로명 + 도로명건물본번호코드)
    // 앞에 00012 이런식으로 되있는걸 12로 바꿔서 더해줍니다.
    let address = apt["도로명"] + " " + apt["도로명건물본번호코드"].replace(/(^0+)/, "");

    // 주소를 위,경도 좌표로 변환하는 함수
    geocoder.addressSearch(address, function(result, status) {
      // 정상적으로 응답을 받았다면
      if (status === kakao.maps.services.Status.OK) {
        // content에는 마커 위에 표시할 html을 넣어주시면 됩니다.

        let content = infoContent(apt["아파트"], imgs[cnt], cnt);
        // 개수를 증가시키고
        cnt++;
        // 위,경도
        let latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 마커에 표시할 텍스트와 위,경도 넣기
        positions.push({ content, latlng });
      }
      // 검색결과 만큼 위,경도를 얻었다면
      if (cnt == houses.size) {
        // 지도그리기
        houseResultDisplayMap();
      }
    });
  }
}

let infowindows, markers;
let clickedAptName = "";
// 검색결과로 지도를 그리고, 각각의 이벤트 추기
function houseResultDisplayMap() {
  // 초기 kakao map 설정 start
  //지도를 담을 영역의 DOM 레퍼런스
  // 지도를 그릴 노드 선택하시면 됩니다.
  const container = document.querySelector(".map-container");
  infowindows = [];
  markers = [];
  clickedAptName = "";
  map = new kakao.maps.Map(container, {
    level: 3, //지도의 레벨(확대, 축소 정도)
    center: new kakao.maps.LatLng(33.450701, 126.570667),
  });

  // 검색결과들의 중앙 위치
  let bounds = new kakao.maps.LatLngBounds();

  // 검색 결과들만큼 반복
  for (let i = 0; i < positions.length; i++) {
    // 바운드 추가
    bounds.extend(positions[i].latlng);

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커의 위치
    });
    // 마커에 표시할 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content, // 인포윈도우에 표시할 내용
    });
    infowindows.push(infowindow);
    markers.push(marker);

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));

    // 마커 클릭시 지도 중심 좌표 옮기기
    kakao.maps.event.addListener(marker, "click", function() {
      let apts = document.querySelectorAll(".apt-click");
      let clickApt = "";
      for (let i = 0; i < apts.length; i++) {
        let aptName = apts[i].textContent.trim();
        if (aptName === infowindow.a.innerText) {
          clickApt = apts[i];
          if (infowindow.a.innerText === clickedAptName) {
            infowindow.close();
            clickedAptName = "";
          } else {
            clickedAptName = aptName;
            clickApt.click(aptName);
          }

          console.log(`클릭 : ${clickedAptName}`);
          break;
        }
      }
    });
  }

  // 지도가 만들어졌을 때 중심좌표
  map.setBounds(bounds);
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
  return function() {
    infowindow.open(map, marker);
    console.log(document.querySelector(".card"));
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function() {
    console.log(`닫는 것 : ${clickedAptName} , ${infowindow.a.innerText}`);
    if (clickedAptName != infowindow.a.innerText) infowindow.close();
  };
}

function moveMap(aptName) {
  for (let i = 0; i < infowindows.length; i++) {
    infowindows[i].close();
  }
  for (let i = 0; i < infowindows.length; i++) {
    let apt = infowindows[i].a.innerText.trim();
    if (aptName === apt) {
      // 위,경도
      infowindows[i].open(map, markers[i]);
      clickedAptName = aptName;
      let latlng = infowindows[i].getPosition();
      // 클릭한 곳으로 지도 중심 이동
      map.panTo(latlng);
      break;
    }
  }
}

function removeMarker(aptName) {
  for (let i = 0; i < infowindows.length; i++) {
    let apt = infowindows[i].a.innerText.trim();
    if (aptName === apt) {
      // 위,경도
      infowindows[i].close();
      clickedAptName = "";
      break;
    }
  }
}

function infoContent(apt, imgs, cnt) {
  let content = `<div class="card" style="width: 12rem;">
  <div class="card-body">
    <p class="card-text">${apt}</p>`;
  let isImg = "";
  if (Array.isArray(imgs) && imgs.length === 0) {
    isImg = `<img class="card-img-top" src="" alt="No search"/>`;
  } else {
    isImg = `<img class="card-img-top" src="${imgs[0]}" alt="No search" style="width:150px; height:120px;"/>`;
  }
  content += isImg + `</div></div>`;

  return content;
}

// const getHtml = async () => {
//   try {
//     return await axios.get(
//       "https://search.naver.com/search.naver?sm=tab_hty.top&where=image&query=%EB%91%90%EC%82%B0%EC%95%84%ED%8C%8C%ED%8A%B8&oquery=&tqi=hiHGOwprvTossBDVP9GssssstRo-043137"
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// function crawling() {
//   getHtml()
//     .then((html) => {
//       let ulList = [];
//       const $ = cheerio.load(html.data);
//       console.log(html);
//       const $bodyList = $("div.photo_tile._grid");
//       console.log($bodyList);
//       $bodyList.each(function(i, elem) {
//         ulList[i] = {
//           url: $(this)
//             .find("div.title_item div.photo_bx div.thumb a img")
//             .attr("src"),
//         };
//       });
//       console.log(ulList);
//       return data;
//     })
//     .then((res) => {
//       console.log(res);
//     });
// }

export default { load, makeMap, moveMap, removeMarker };

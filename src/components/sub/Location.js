import { useEffect, useRef } from "react";
import { useState } from "react";

function Location() {
    const top = useRef(null);
    const right = useRef(null);
    const bottom = useRef(null);
    const left = useRef(null);
    const pop = useRef(null);
    const topLeft = useRef(null);

    const {kakao} = window;
    const container = useRef(null);
    const btnBranch = useRef(null);
    const [index, setIndex] = useState(0);
    const [map, setMap] = useState(null);
    const [toggle, setToggle] = useState(false);
    
    const info = [
        {
          title : "본점", 
          latlng : new kakao.maps.LatLng(37.5132313,127.0594368),
          //public폴더 안쪽의 절대경로와 이미지 주소 연결
          imgSrc : process.env.PUBLIC_URL+"/img/marker1.png", 
          imgSize : new kakao.maps.Size(232, 99),
          imgPos : {offset: new kakao.maps.Point(116, 99)}
        },
        {
          title : "지점1", 
          latlng : new kakao.maps.LatLng(37.507099899564444,126.75639338893572),
          imgSrc : process.env.PUBLIC_URL+"/img/marker2.png", 
          imgSize : new kakao.maps.Size(232, 99),
          imgPos : {offset: new kakao.maps.Point(116, 99)}
        },
        {
          title : "지점2", 
          latlng : new kakao.maps.LatLng(35.17422705914147,129.10766665201712),
          imgSrc : process.env.PUBLIC_URL+"/img/marker3.png", 
          imgSize : new kakao.maps.Size(232, 99),
          imgPos : {offset: new kakao.maps.Point(116, 99)}
        }
      ];

      const [mapInfo] = useState(info);

    useEffect(() => {
        const options = {
            center: mapInfo[index].latlng, 
            level: 3 
        }

        const map = new kakao.maps.Map(container.current, options);
        setMap(map);

        new kakao.maps.Marker({
            map : map,
            position :mapInfo[index].latlng,
            title: mapInfo[index].title,
            image : new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
        });

        map.setCenter(mapInfo[index].latlng);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl,kakao.maps.ControlPosition.TOPRIGHT);
        map.setZoomable(true);
        map.setDraggable(true);

        for(const btn of btnBranch.current.children) btn.classList.remove("on");
        btnBranch.current.children[index].classList.add("on");

        const mapSet = () => map.setCenter(mapInfo[index].latlng);

        window.addEventListener("resize", mapSet);

        return () => window.removeEventListener("resize", mapSet);

    },[index]);

    return(
        <div id="location">
            <div className="topPic">
            <aside ref={pop}>
                    <div className="top" ref={top}></div>
                    <div className="right" ref={right}></div>
                    <div className="bottom" ref={bottom}></div>
                    <div className="left" ref={left}></div>
                    <div className="topLeft" ref={topLeft}></div>
                </aside>
                        
                <p>Location</p>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, doloribus!</span>
            </div>
            <div className="inner">
                
                <div id="map" ref={container}></div>
                <div className="wrap">
                    <h1>BIG WOOD Info</h1>
                    <h2>Contacts</h2>
                    <ul className="contacts">
                        <li><p>Phone</p> <span>+1 (800) 123 45 46</span></li>
                        <li><p>Address</p> <span>34th Ave, Queens, NY 11106</span></li>
                        <li><p>Website</p><span>www.bigwood.com</span></li>
                    </ul>
                    <h2>Opening Hours</h2>
                    <ul className="opening">
                        <li><p>Monday - Saturday</p><span>10 a.m. - 5 p.m.</span></li>
                        <li><p>Sunday</p><span>11 a.m. - 5 p.m.</span></li>
                    </ul>
                </div>
                
                <ul className="traffic">

                    {
                        toggle ?
                            <li onClick={()=>{
                                map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
                                
                                setToggle(!toggle);
                            }}>Turn Off Traffic Info</li>
                            //토글값이 false일때 켜기버튼 활성화
                            :            
                            <li onClick={()=>{           
                                map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                                
                                setToggle(!toggle);
                            }}>View Traffic Info</li>  
                    }
                    
                </ul>

                <ul className="branch" ref={btnBranch}>
                    <li onClick={() => {
                        setIndex(0);
                    }}>HEAD</li>
                    <li onClick={() => {
                        setIndex(1);
                    }}>BRANCH1</li>
                    <li onClick={() => {
                        setIndex(2);
                    }}>BRANCH2</li>
                </ul>

                <p>It pays to plan ahead, you will always get our lowest prices online if you book more than 48 hours in advance. Tickets purchased online are non-refundable. With our flexible pricing, you can choose the day, price and plan that suits you best. To make a reservation for a group visit, please contact us directly.</p>
            </div>
        </div>
    )
}

export default Location;
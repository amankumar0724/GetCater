import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
    {
        image: 'https://cdn-icons-png.flaticon.com/128/2400/2400629.png',
        name: 'Room'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/9942/9942521.png',
        name: 'Table'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/8044/8044746.png',
        name: 'Hall'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/9425/9425742.png',
        name: 'Food'
    },
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col mt-5">
                <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
                    <div className="flex">
                        {categories.map((item, index) => (
                            <div key={index} className="px-3 lg:px-10">
                                <div
                                    onClick={() => {
                                        if (item.name === 'Food') {
                                            navigate('/category/Food')
                                        } else {
                                            navigate(`/category/${item.name}`)
                                        }
                                    }}
                                    className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-red-500 transition-all hover:bg-red-600 cursor-pointer mb-1 flex items-center justify-center"
                                >
                                    <img src={item.image} alt="Category" className="w-8 h-8 lg:w-12 lg:h-12" />
                                </div>
                                <h1 className="text-sm lg:text-lg text-center font-medium title-font text-gray-800">
                                    {item.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {-ms-overflow-style: none;scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {display: none;}" }} />
        </div>
    );
}

export default Category;
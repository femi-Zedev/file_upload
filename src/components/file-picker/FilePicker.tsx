import React, { useState } from "react";
// @ts-ignore 
import Files from "react-files";
import FileItem from "./FileItem";
import { Button } from "@mantine/core";
import { useRecoilState } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { FilesPicked, UploadPercentages } from "@/recoil/atoms";



// react-files source : https://www.npmjs.com/package/react-files
// a complete guide to file upload: https://betterprogramming.pub/a-complete-guide-of-file-uploading-in-javascript-2c29c61336f5

interface FilePickerType {
    className?: string,
    isMultiple?: boolean,// true active la selection multiple
    accepts?: Array<string>,
    formatList?: string,// le label des formats supporté au niveau du text "Formats supportés:"  
    maxFileSize?: number, // maxFileSize en Megabyte
    minFileSize?: number,
    percentages?: number[] // minFileSize en Megabyte
    onChange: (files: Array<File>) => void
}

const FilePicker = (
    {
        className,
        isMultiple = true,
        accepts = ["image/*", ".pdf"], // ["image/*", ".pdf", "audio/*"],
        formatList = "PNG, JPG, WebP, SVG, PDF",
        maxFileSize = 10,
        minFileSize = 0,
        percentages = [],
        onChange
    }: FilePickerType) => {


    const [selectedFiles, setSelectedFiles] = useRecoilState<File[]>(FilesPicked);
    const [filePercentages, setFilePercentages] = useRecoilState<number[]>(UploadPercentages);

    // get files when selected and add them to state for display purpose
    const onFilesChange = (files: File[]) => {
        isMultiple ? setSelectedFiles([...selectedFiles, ...files]) : setSelectedFiles(files);
        onChange(files)
    };

    // error to display when error on file upload
    const onFilesError = (error: any, file: any) => {
        console.log(error.message)
        // setAlertObj({open: true, type: "error", message: error.message});
    };

    // remove displayed file from the dom
    const onFileDelete = (index: number) => {
        setSelectedFiles((files) => files.filter((item, i ) => i !== index));
        setFilePercentages((percentages) => percentages.filter((item, i ) => i !== index))
    };




    return (
        <>
            <div className="grid grid-cols-12 h-full gap-x-5 justify-between">
                <Files
                    className={`${className} md:col-span-6 col-span-12 w-full flex items-center cursor-pointer`}
                    onChange={onFilesChange}
                    onError={onFilesError}
                    accepts={accepts} // accepts=["image/png", "image/jpeg", ".pdf", "audio/*"]
                    multiple={isMultiple}
                    maxFileSize={maxFileSize * 1000000} // maxFileSize={10000000}
                    minFileSize={minFileSize * 1000000} // minFileSize={0}
                    clickable
                >
                    <div className="w-full rounded-lg p-10 border-2 border-gray-200/20 border-dashed bg-zinc-500/10">
                        <svg className="mx-auto mb-10" width="59" height="48" viewBox="0 0 59 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M53.867 18.6443C52.2907 17.4756 50.3541 16.6176 48.3095 16.1549C47.9737 16.0793 47.6664 15.9099 47.4234 15.6662C47.1804 15.4226 47.0117 15.1149 46.937 14.779C46.0588 10.8664 44.1683 7.51118 41.3896 4.96886C38.1593 2.00882 33.8876 0.380737 29.3603 0.380737C25.3801 0.380737 21.704 1.62825 18.735 3.98931C16.7228 5.592 15.103 7.63299 13.9994 9.95667C13.8797 10.2109 13.7022 10.4337 13.4811 10.6071C13.26 10.7805 13.0014 10.8997 12.7259 10.9554C9.71411 11.5634 6.99501 12.8548 4.91882 14.6844C2.05223 17.2177 0.536743 20.5853 0.536743 24.4304C0.536743 28.317 2.1682 31.8614 5.12937 34.424C7.95767 36.8661 11.7655 38.2116 15.8492 38.2116H27.5588V20.9434L23.4278 25.0744C23.2553 25.2468 23.0496 25.3825 22.8232 25.4731C22.5968 25.5637 22.3543 25.6073 22.1105 25.6014C21.8667 25.5955 21.6266 25.5402 21.4048 25.4388C21.183 25.3373 20.9841 25.1919 20.8202 25.0113C20.1671 24.2941 20.2302 23.1761 20.9159 22.4904L28.0868 15.3206C28.4247 14.983 28.8827 14.7933 29.3603 14.7933C29.8378 14.7933 30.2959 14.983 30.6337 15.3206L37.8046 22.4882C38.5117 23.1964 38.5523 24.3572 37.8486 25.0676C37.6816 25.2362 37.483 25.3702 37.2641 25.4619C37.0453 25.5535 36.8105 25.601 36.5732 25.6016C36.3359 25.6022 36.1008 25.556 35.8815 25.4655C35.6621 25.375 35.4628 25.2421 35.295 25.0744L31.1617 20.9434V38.2116H45.1231C48.6517 38.2116 51.8685 37.2208 54.1811 35.4227C56.8 33.3848 58.1838 30.4687 58.1838 26.9975C58.1838 23.6265 56.6908 20.7362 53.867 18.6443ZM27.5588 45.4648C27.5588 45.9425 27.7486 46.4008 28.0864 46.7386C28.4243 47.0764 28.8825 47.2662 29.3603 47.2662C29.838 47.2662 30.2963 47.0764 30.6341 46.7386C30.9719 46.4008 31.1617 45.9425 31.1617 45.4648V38.2116H27.5588V45.4648Z" fill="white" />
                        </svg>


                        <div className="text-center text-sm">
                            <p className="font-semibold text-2xl">Glissez vos fichiers ici</p>
                            <p className="text-gray-400 mt-3">Glissez et déposez vos fichiers: {formatList} ici.</p>
                            <p className="text-gray-400">Taille maximale: {maxFileSize}MB</p>

                            <div className="text--caption my-2 text-gray-400">- OU -</div>

                            <Button variant="outline" color="gray" className="mx-auto">
                                Sélectionner un fichier
                            </Button>
                        </div>
                    </div>


                </Files>

                <div className="md:col-span-6 pt-10 pb-10 col-span-12 w-full h-full">

                    <span className="mb-3 flex justify-between">
                        <h3 className="text-lg  font-semibold">Fichiers uploadés</h3>
                        {
                            selectedFiles.length > 0 &&
                            <button className="underline text-xs" onClick={() => { setSelectedFiles([]); setFilePercentages([]) }}>
                                Tout effacer
                            </button>
                        }
                    </span>

                    {
                        selectedFiles.length > 0 &&
                        <div className="overflow-y-scroll h-[23rem] pr-1">
                            <AnimatePresence >
                                {selectedFiles.map((file:File, i) => (
                                    <motion.div
                                        // @ts-ignore
                                        key={file.id}
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ opacity: { duration: 0.2 }, width: { duration: 0.4 }, }}>
                                        <FileItem
                                            file={file}
                                            onFileDelete={() => onFileDelete(i)}
                                            uploadPercent={percentages[i]}
                                        />
                                    </motion.div>

                                ))}
                            </AnimatePresence>
                        </div>
                    }


                    {selectedFiles.length == 0 &&
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">

                                <svg width="145" height="145" viewBox="0 0 145 145" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_302_1166)">
                                        <rect width="145" height="145" rx="72.5" fill="#71717A" fillOpacity="0.101961" />
                                        <path d="M121.132 84.1464H84.1742C80.8136 84.1464 77.5906 82.8114 75.2143 80.435C72.838 78.0587 71.503 74.8358 71.503 71.4752V34.5175C71.503 34.2374 71.3917 33.9688 71.1937 33.7708C70.9957 33.5728 70.7271 33.4615 70.447 33.4615H46.1606C41.6797 33.4615 37.3825 35.2415 34.214 38.41C31.0456 41.5784 29.2656 45.8757 29.2656 50.3565V134.831C29.2656 139.312 31.0456 143.609 34.214 146.778C37.3825 149.946 41.6797 151.726 46.1606 151.726H105.293C109.774 151.726 114.071 149.946 117.239 146.778C120.408 143.609 122.188 139.312 122.188 134.831V85.2023C122.188 84.9222 122.077 84.6537 121.878 84.4556C121.68 84.2576 121.412 84.1464 121.132 84.1464Z" fill="white" />
                                        <path d="M118.814 74.7985L80.8505 36.8351C80.7767 36.7617 80.6828 36.7117 80.5807 36.6915C80.4786 36.6714 80.3727 36.6818 80.2765 36.7216C80.1803 36.7614 80.098 36.8287 80.04 36.9151C79.982 37.0015 79.9508 37.1032 79.9503 37.2073V71.475C79.9503 72.5952 80.3953 73.6695 81.1874 74.4616C81.9795 75.2537 83.0538 75.6987 84.1741 75.6987H118.442C118.546 75.6982 118.647 75.667 118.734 75.609C118.82 75.551 118.888 75.4687 118.927 75.3725C118.967 75.2763 118.978 75.1705 118.957 75.0683C118.937 74.9662 118.887 74.8723 118.814 74.7985Z" fill="white" />
                                        <rect x="64.6923" y="102.615" width="27.5128" height="6.69231" rx="3.34615" fill="#EAECF0" />
                                        <rect x="54.2821" y="115.256" width="48.3333" height="6.69231" rx="3.34615" fill="#EAECF0" />
                                        <path d="M106.333 30.4872C94.853 30.4872 85.5128 39.8274 85.5128 51.3077C85.5128 62.788 94.853 72.1282 106.333 72.1282C117.814 72.1282 127.154 62.788 127.154 51.3077C127.154 39.8274 117.814 30.4872 106.333 30.4872ZM113.872 56.5819C114.027 56.7291 114.151 56.9059 114.236 57.1018C114.322 57.2977 114.367 57.5087 114.37 57.7225C114.373 57.9363 114.333 58.1484 114.252 58.3464C114.172 58.5444 114.052 58.7243 113.901 58.8755C113.75 59.0266 113.57 59.146 113.372 59.2266C113.174 59.3071 112.962 59.3472 112.748 59.3444C112.534 59.3417 112.323 59.2962 112.127 59.2106C111.932 59.125 111.755 59.0011 111.608 58.8461L106.333 53.5729L101.059 58.8461C100.756 59.1338 100.353 59.2918 99.9355 59.2865C99.5179 59.2811 99.1189 59.1128 98.8235 58.8175C98.5282 58.5222 98.3599 58.1231 98.3546 57.7055C98.3492 57.2879 98.5072 56.8847 98.7949 56.5819L104.068 51.3077L98.7949 46.0335C98.5072 45.7307 98.3492 45.3275 98.3546 44.9099C98.3599 44.4922 98.5282 44.0932 98.8235 43.7979C99.1189 43.5026 99.5179 43.3343 99.9355 43.3289C100.353 43.3236 100.756 43.4816 101.059 43.7693L106.333 49.0425L111.608 43.7693C111.91 43.4816 112.314 43.3236 112.731 43.3289C113.149 43.3343 113.548 43.5026 113.843 43.7979C114.138 44.0932 114.307 44.4922 114.312 44.9099C114.317 45.3275 114.159 45.7307 113.872 46.0335L108.599 51.3077L113.872 56.5819Z" fill="#DBAABC" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_302_1166">
                                            <rect width="145" height="145" rx="72.5" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <p className="font-medium mt-3">Aucun fichier</p>
                            </div>



                        </div>
                    }
                </div>
            </div>



        </>
    );
}



export default FilePicker

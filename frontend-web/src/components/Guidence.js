import React, { useState, useEffect, useContext } from 'react';
import Style from '../styles/EditorStyle.module.css'

export default function Guidence() {

    //guidence complete

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 4; // Number of pages in the guide

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            // alert(currentPage)
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (


        <div className="container col-span-3 mx-auto p-4 bg-gray-100 rounded shadow ml-4 relative" style={{ textAlign: 'left', height: '650px', overflowX: 'hidden' }}>
            <center><h2 className="text-2xl mb-4"><b>Voice Command Guide</b></h2></center>
            <div className={`mb-5 ${currentPage === 0 ? 'block' : 'hidden'}`} >
                <p className="text-base">Follow these steps to use the voice command interface:</p>
                <ol className="list-decimal list-inside">
                    <li className="mb-1"> Select a programming language from the dropdown.</li>
                    <li className="mb-1"> Click the "Start Listening" button to activate voice recognition.</li>
                    <li className="mb-1"> Speak one of the supported commands, like "create function" or "declare variable".</li>
                    <li className="mb-1"> Your spoken command will be processed and code snippets will be generated.</li>
                    <li className="mb-1"> Generated code will appear in the editor. You can manually edit it if needed.</li>
                    <li className="mb-1"> Click the "Apply Code" button to insert the generated code into the editor.</li>
                    <li className="mb-1"> Click the "Run Code" button to execute the code and see the output.</li>
                    <li> Or Give "Execute" voice command</li>
                </ol>
            </div>
            {/* ... Other content for Page 1 */}
            <div className={`${currentPage === 1 ? 'block' : 'hidden'}`}>
                <ul className="list-decimal list-inside mb-5">
                    <li className="mb-1"><strong>"create function":</strong>  Create a function template.</li>
                    <li className="mb-1"><strong>"declare variable":</strong>  Declare variable.</li>
                    <li className="mb-1"><strong>"constant":</strong>  Generates constant declaration.</li>
                    <li className="mb-1"><strong>"create class":</strong>  Generates a class definition.</li>
                    <li className="mb-1"><strong>"comment":</strong>  Adds a comment to the code.</li>
                    <li className="mb-1"><strong>"create object":</strong>  Generates an object instance.</li>
                    <li className="mb-1"><strong>"initialize":</strong>  Initializes variables or objects.</li>
                    <li className="mb-1"><strong> "print":</strong> Outputs information to the console.</li>
                    <li className="mb-1"><strong>"create loop":</strong>  Generates a loop structure.</li>
                    <li className="mb-1"><strong>"create if else":</strong>  Generates if-else statement.</li>
                    <li className="mb-1"><strong>"execute":</strong>  Executes the code.</li>
                    <li className="mb-1"><strong>"print variable":</strong>  Displays the value of a variable.</li>
                </ul>
                <p className="text-base" style={{ bottom: '0px' }}>Here are some example commands:</p>
                {/* ... Other content for Page 2 */}
            </div>
            {/* ... Other content for Page 2 */}
            <div className={`${currentPage === 2 ? 'block' : 'hidden'}`}>
                <ul className="list-decimal list-inside mb-5">
                    <li className="mb-1"><strong>"create loop with condition i less than 10"::</strong>  Generates a for loop with the specified condition.</li>
                    <li className="mb-1"><strong>"create if else statement with condition x greater than 5":</strong>  Generates an if-else statement with the specified condition.</li>
                    <li className="mb-1"><strong>"create break statement":</strong>  Generates an break statement with the specified condition.</li>
                    <li className="mb-1"><strong>"print variableName":</strong>  Generates a console log statement to print the specified variable.</li>
                    <li className="mb-1"><strong>"constant ConstantName":</strong> Generates a constant declaration.</li>
                    <li className="mb-1"><strong>"create object hello":</strong>  Generates an object declaration with attributes.</li>
                    <li className="mb-1"><strong>"initialize Number":</strong> Generates variable initialization with a specified type.</li>
                </ul>
                <h4 className="text-lg mb-4">Example Voice Commands:</h4>
                {/* ... Other content for Page 3 */}
            </div>
            <div className={`${currentPage === 3 ? 'block' : 'hidden'}`}>
                <ul className="list-decimal list-inside mb-5">
                    <li className="mb-1"><strong>"create star pattern"::</strong>  Generates star pattern using the specified condition.</li>
                    <li className="mb-1"><strong>"summation":</strong>  Generates summation using two integer type inputs.</li>
                    <li className="mb-1"><strong>"find text size":</strong>  Generates a code using .length.</li>
                    <li className="mb-1"><strong>"comment hello":</strong>  Generates a comment.</li>
                    <li className="mb-1"><strong>"call function functionName":</strong>  Generates a function call.</li>
                    <li className="mb-1"><strong>"create class ClassName":</strong>  Generates a class definition.</li>
                    <li className="mb-1"><strong>"create function myFunction": </strong> Generates a function template.</li>
                    <li className="mb-1"><strong>"declare variable myVariable":</strong>  Generates a variable declaration.</li>
                    <li className="mb-1"><strong>"print variable varibleName":</strong> Displays the value of a variable.</li>
                </ul>
                <h4 className="text-lg mb-4">Example Voice Commands:</h4>
                {/* ... Other content for Page 3 */}
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-3">
                <button
                    className="btn me-1 w-20"
                    onClick={prevPage}
                    style={{ borderRadius: "28px", background: "linear-gradient(45deg, #010758, #490d61)", color: 'white' }}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary w-20"
                    onClick={nextPage}
                    style={{ borderRadius: "28px", padding: "5px 22px", background: "linear-gradient(45deg, #010758, #490d61)", color: 'white' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}


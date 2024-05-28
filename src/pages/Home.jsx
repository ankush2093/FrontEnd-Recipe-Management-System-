// // import React, { useEffect } from "react";
// // import { useState } from "react";
// // import axios from "axios";
// // import Card from "../components/Card";
// // import { useGetUserID } from "../hooks/useGetUserID";
// // import ReactLoading from "react-loading";

// // const Home = () => {
// //   const [recipes, setRecipes] = useState([]);
// //   const [savedRecipes, setSavedRecipes] = useState([]);

// //   useEffect(() => {
// //     const fetchRecipes = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:9000/recipes"
// //         );
// //         const recipesWithUsernames = await Promise.all(
// //           response.data.map(async (recipe) => {
// //             try {
// //               const userResponse = await axios.post(
// //                 "http://localhost:9000/auth/getUser",
// //                 { userID: recipe.userOwner }
// //               );
// //               const username = userResponse.data.username;
// //               return { ...recipe, username };
// //             } catch (error) {
// //               console.error("Error fetching user:", error);
// //               return { ...recipe, username: null };
// //             }
// //           })
// //         );
// //         const uid = useGetUserID();
// //         if (uid) {
// //           const savedRecipesResponse = await axios.get(
// //             "http://localhost:9000/recipes/saved/" + uid
// //           );
// //           setSavedRecipes(savedRecipesResponse.data);
// //         }
// //         setRecipes(recipesWithUsernames.reverse());
// //       } catch (error) {
// //         console.error("Error fetching recipes:", error);
// //       }
// //     };

// //     fetchRecipes();
// //   }, []);

// //   return (
// //     <div className="flex-col items-center justify-center py-6 w-full">
// //       <div className="">
// //         {/* Add fiter property make */}

// //         <h1 className="text-2xl font-semibold text-center leading-7 text-gray-900">
// //           All Recipes
// //         </h1>
// //       </div>
// //       {recipes.length === 0 ? (
// //         <div className="w-full flex items-center justify-center h-screen -mt-40">
// //           <ReactLoading type="spin" color="#3949AB" height={70} width={70} />
// //         </div>
// //       ) : (
// //         <div className="w-full mt-4 mx-auto flex justify-center items-center px-4 md:px-28 lg:px-40 xl:px-96">
// //           <div className="flex flex-col gap-5">
// //             {recipes.map((recipe) => (
// //               <Card
// //                 key={recipe._id}
// //                 name={recipe.name}
// //                 imageUrl={recipe.imageUrl}
// //                 ingredients={recipe.ingredients}
// //                 avoidIngredients={recipe.avoidIngredients}
// //                 instructions={recipe.instructions}
// //                 cookingTime={recipe.cookingTime}
// //                 userName={recipe.username}
// //                 id={recipe._id}
// //                 savedRecipes={savedRecipes}
// //                 loggedInUser={useGetUserID()}
// //                 bool={savedRecipes.includes(recipe._id)}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from "../components/Card";
// import { useGetUserID } from "../hooks/useGetUserID";
// import ReactLoading from "react-loading";

// const Home = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/recipes");
//         const recipesWithUsernames = await Promise.all(
//           response.data.map(async (recipe) => {
//             try {
//               const userResponse = await axios.post(
//                 "http://localhost:9000/auth/getUser",
//                 { userID: recipe.userOwner }
//               );
//               const username = userResponse.data.username;
//               return { ...recipe, username };
//             } catch (error) {
//               console.error("Error fetching user:", error);
//               return { ...recipe, username: null };
//             }
//           })
//         );
//         const uid = useGetUserID();
//         if (uid) {
//           const savedRecipesResponse = await axios.get(
//             "http://localhost:9000/recipes/saved/" + uid
//           );
//           setSavedRecipes(savedRecipesResponse.data);
//         }
//         setRecipes(recipesWithUsernames.reverse());
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   // const filteredRecipes = recipes.filter(recipe =>
//   //   recipe.name.toLowerCase().includes(search.toLowerCase())
//   // );
//   const filteredRecipes = recipes.filter(recipe =>
//     recipe.name.toLowerCase().includes(search.toLowerCase()) ||
//     recipe.category.toLowerCase().includes(search.toLowerCase())
//   );
  

//   return (
//     <div className="flex-col items-center justify-center py-6 w-full">
//       <div className="flex flex-col items-center">
       
//         {/* Add filter property */}
//         <h1 className="text-2xl font-semibold text-center leading-7 text-gray-900">
//           All Recipes
//         </h1>
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search recipes"
//           className="mt-4 p-2 border rounded-md w-3/4 md:w-1/2 lg:w-1/3"
//         />
//       </div>
//       {recipes.length === 0 ? (
//         <div className="w-full flex items-center justify-center h-screen -mt-40">
//           <ReactLoading type="spin" color="#3949AB" height={70} width={70} />
//         </div>
//       ) : (
//         <div className="w-full mt-4 mx-auto flex justify-center items-center px-4 md:px-28 lg:px-40 xl:px-96">
//           <div className="flex flex-col gap-5">
//             {filteredRecipes.map((recipe) => (
//               <Card
//                 key={recipe._id}
//                 name={recipe.name}
//                 category={recipe.category}
//                 imageUrl={recipe.imageUrl}
//                 ingredients={recipe.ingredients}
//                 avoidIngredients={recipe.avoidIngredients}
//                 instructions={recipe.instructions}
//                 cookingTime={recipe.cookingTime}
//                 userName={recipe.username}
//                 id={recipe._id}
//                 savedRecipes={savedRecipes}
//                 loggedInUser={useGetUserID()}
//                 bool={savedRecipes.includes(recipe._id)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useGetUserID } from "../hooks/useGetUserID";
import ReactLoading from "react-loading";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://backend-recipe-management-system.onrender.com/recipes");
        const recipesWithUsernames = await Promise.all(
          response.data.map(async (recipe) => {
            try {
              const userResponse = await axios.post(
                "https://backend-recipe-management-system.onrender.com/auth/getUser",
                { userID: recipe.userOwner }
              );
              const username = userResponse.data.username;
              return { ...recipe, username };
            } catch (error) {
              console.error("Error fetching user:", error);
              return { ...recipe, username: null };
            }
          })
        );
        const uid = useGetUserID();
        if (uid) {
          const savedRecipesResponse = await axios.get(
            "https://backend-recipe-management-system.onrender.com/recipes/saved/" + uid
          );
          setSavedRecipes(savedRecipesResponse.data);
        }
        setRecipes(recipesWithUsernames.reverse());
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) ||
    recipe.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-col items-center justify-center py-6 w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-center leading-7 text-gray-900">
          All Recipes
        </h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes"
          className="mt-4 p-2 border rounded-md w-3/4 md:w-1/2 lg:w-1/3"
        />
      </div>
      {recipes.length === 0 ? (
        <div className="w-full flex items-center justify-center h-screen -mt-40">
          <ReactLoading type="spin" color="#3949AB" height={70} width={70} />
        </div>
      ) : (
        <div className="w-full mt-4 mx-auto flex justify-center items-center px-4 md:px-28 lg:px-40 xl:px-96">
          <div className="flex flex-col gap-5">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe._id}
                name={recipe.name}
                category={recipe.category}
                imageUrl={recipe.imageUrl}
                ingredients={recipe.ingredients}
                avoidIngredients={recipe.avoidIngredients}
                instructions={recipe.instructions}
                cookingTime={recipe.cookingTime}
                userName={recipe.username}
                id={recipe._id}
                savedRecipes={savedRecipes}
                loggedInUser={useGetUserID()}
                bool={savedRecipes.includes(recipe._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;



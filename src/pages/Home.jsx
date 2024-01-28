import { useEffect, useState } from "react"
import { urlBase } from "../common"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setList } from '../redux/slices';

export const Home = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    let currentPage = Number(queryParams.get("page")) || 1
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [keys] = useState(["first_name", "last_name", 'profession']);
    const dispatch = useDispatch();
    const list = useSelector((state) => state.list);
    const paginatedList = () => { return list?.filter(item => item.current === currentPage)?.[0] }


    const handlePageChange = (newPage) => {
        if (currentPage !== newPage) { currentPage = newPage }
        queryParams.set("page", newPage);
        navigate({ search: queryParams.toString() });
        fetchData()
        window.scrollTo(0, 0)
    }
    const fetchData = async () => {
        try {

            const now = new Date().getTime();
            const oneDayInMillis = 24 * 60 * 60 * 1000;
            const lastRequested = paginatedList()?.lastRequested
            if (!lastRequested || now - lastRequested > oneDayInMillis) {
                const response = await axios.get(`${urlBase}?${queryParams}`);
                dispatch(setList({ ...response.data, lastRequested: now }));
            }
        } catch (error) {
            console.log(error)
        }
    };
    const filterList = () => {
        return paginatedList()?.results?.filter((item) => {
            return keys.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) > -1
                );
            });
        });
    }

    useEffect(() => {
        handlePageChange(currentPage)
    }, [])

    return (
        <div className="container">
            <div className="input-group">
                <img src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"></img>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search-text"
                />
            </div>

            <div className="text-group">
                <span className="title">Find your Oompa Lompa</span>
                <span className="subtitle">There are more than 100k</span>
            </div>


            {paginatedList() &&
                <div className="pagination-btn">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous Page
                    </button>
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        Next Page
                    </button>
                </div>
            }


            <div className="items-group">
                {filterList()?.map((item) => (
                    <div
                        key={item.id}
                        className="card"
                        onClick={() => navigate(`/${item.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={item.image} />
                        <span className="title">{`${item.first_name} ${item.last_name}`}</span>
                        <span className="other" >{item.gender === 'M' ? 'Man' : 'Women'}</span>
                        <i className="other">{item.profession}</i>
                    </div>
                ))}
            </div>

        </div>
    )
}

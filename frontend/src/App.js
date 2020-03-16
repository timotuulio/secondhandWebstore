import React from 'react';
import useFetch from "use-http";


const { useState, useEffect } = React;

    function Players(){

        const [hasError, setErrors] = useState(false);
        const [player, setPlayer] = useState(null);
        const [players, setPlayers] = useState(null);
        const [path, setPath] = useState(null);
        const [deleted,setDeleted] = useState(false);
        const [created,setCreated] = useState(false);
        const [name, setName] = useState('');
        const [active, setActive] = useState('');


        // Get all players
        async function fetchData() {
            const res = await fetch('http://localhost:3001/api/item');
            
            res
                .json()
                .then(res => console.log(res))
                .catch(err => setErrors(err));
        }

        // Get single player
        async function fetchPlayer(id) {
            const res = await fetch('/players/'+id);    
            res
                .json()
                .then(res => setPlayer(res))
                .catch(err => setErrors(err));
        }

        // For deleting player
        async function deletePlayer(id) {
            const res = await fetch('/players/'+id, {
                method: "DELETE"});
            res
                .json()
                .then(res => setDeleted(true))
                .then(res => setPlayer(null))
                .catch(err => setErrors(err));
        }

        // For creating new player
        async function createPlayer() {

            // Construct new object
            var data = {};
            data.name = name;
            if(active == 'true'){
                data.active = true;
            }else{
                data.active = false;
            }

            const res = await fetch('/players', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)});
                res
                .json()
                .then(res => setCreated(true))
                .catch(err => setErrors(err));
        }

        // Hook for updating stuff
        useEffect(() =>{
            fetchData();
            setDeleted(false);
            setCreated(false);
        },[path,deleted,created]);

      
 


        //returns
        if (players==null) {
            return <p>No data</p>;
        }
      
    
        const playerItems = players.map((player) => <li key={player._id}><button onClick={() => fetchPlayer(player._id)}>{player.name}</button></li>);
        

         // This will render in the beginning when player attribute is null
        if(player == null){
                //console.log("rendered")
                return(
                    <div>
                        <h1>Players</h1>
                        {playerItems}

                        <form onSubmit={createPlayer}>
                        <label>
                         Name:
                        <input
                            value={name}
                            onChange={event => setName(event.target.value)}
                            name="name"
                            type="text"
                            />
                        </label>
                        <br />
                        <label>
                            Active:
                            <input
                            value={active}
                            onChange={event => setActive(event.target.value)}
                            name="active"
                            type="boolean"
                            />
                        </label>
                        <br />
                        <button>Submit</button>
                        </form>
                    </div>
                    
                )
        }


        // Set activestatus based on boolean value
        var activeStatus;
        if(player.active == true){
            activeStatus = 'Yes';
        }else{
            activeStatus = 'No';
        }

        // This will be rendered after the link is clicked, showing player information
        return(
                <div>
                    <h1>Players</h1>
                    {playerItems}
                    <h3>Player Info</h3>
                    <h4>Name: {player.name}</h4>
                    <h4>Active: {activeStatus}</h4>
                    <button onClick = {() => deletePlayer(player._id)}>Delete Player</button>
                    <form onSubmit={createPlayer}>
                        <label>
                         Name:
                        <input
                            value={name}
                            onChange={event => setName(event.target.value)}
                            name="name"
                            type="text"
                            />
                        </label>
                        <br />
                        <label>
                            Active:
                            <input
                            value={active}
                            onChange={event => setActive(event.target.value)}
                            name="active"
                            type="boolean"
                            />
                        </label>
                        <br />
                        <button>Submit</button>
                        </form>
                </div>
            )

        
    };




export default Players;

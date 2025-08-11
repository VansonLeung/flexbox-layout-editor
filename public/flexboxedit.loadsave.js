window.FlexboxEdit.LoadSave = (() => {

  const _apiCall = async (url, {
    method,
    query,
    body,
  }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = body ? JSON.stringify(body) : undefined;

    const requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const queryStrings = [];

    if (query) {
      const queryKeys = Object.keys(query);
      for (var k in queryKeys) {
        const key = queryKeys[k];
        queryStrings.push(`${key}=${JSON.stringify(query[key])}`);
      }
    }

    const queryString = queryStrings.join("&");

    try {
      const res = await fetch(`http://localhost:3000/api${url}?${queryString}`, requestOptions)
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }


  const applyLoad = async (id) => {
    return await _apiCall(`/Template/${id}`, {
      method: "GET",
    })
  }

  const applyLoadList = async () => {
    return await _apiCall(`/Template`, {
      method: "GET",
      query: {
        sort: [
          ["name", "ASC"],
        ],
      },
    })
  }

  const applySave = async (id, body) => {
    if (id) {
      return await _apiCall(`/Template/${id}`, {
        method: "PUT",
        body,
      })
    } else {
      return await _apiCall(`/Template`, {
        method: "POST",
        body,
      })
    }
  }

  const applyRemove = async (id) => {
    if (id) {
      return await _apiCall(`/Template/${id}`, {
        method: "DELETE",
      })
    }
  }

  return {
    applyLoad,
    applyLoadList,
    applySave,
    applyRemove,
  }

})();
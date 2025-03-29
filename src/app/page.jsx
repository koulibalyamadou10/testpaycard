'use client'
import { useState, useEffect } from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // La page initiale est 1

  useEffect(() => {
    const fetchItems = async () => {
      if (loading) return;  // Si une requête est déjà en cours, on n'en lance pas une nouvelle
      setLoading(true);

      const response = await fetch(`https:api.kambily.com/products/viewset/?page=${page}`);
      const data = await response.json();

      // @ts-ignore
      setItems((prevItems) => [...prevItems, ...data.results]); // Ajoute les nouveaux éléments à la liste
      setHasMore(data.next !== null); // Si `next` est null, on n'a plus de données à charger
      setLoading(false);
    };

    fetchItems();
  }, [page]); // Recharger les éléments à chaque changement de page

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMore) {
      setPage((prevPage) => prevPage + 1); // Incrémenter la page pour charger plus d'éléments
    }
  };

  return (
      <div
          onScroll={handleScroll}
          style={{ height: '80vh', overflowY: 'scroll' }}
      >
        {items.map((item) => (
            <div key={item.id} style={{height:'400px', backgroundColor:'red'}} className="item">
              {/* Affiche les éléments ici */}
              {item.name}
            </div>
        ))}
        {loading && <p>Chargement...</p>}
        {!hasMore && <p>Plus d'éléments à charger.</p>}
      </div>
  );
};

export default InfiniteScroll;

// ...existing code...
import { useEffect, useState, useMemo } from "react";
import type { Recipe } from "../types/Recipe";
import apiClient, { baseURL } from "../api/apiClient";
import { toast } from "react-toastify";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Button, Card, Col, Spinner, Form, InputGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../design/AllRecipes.css";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function fetchRecipes() {
    setIsLoading(true);
    apiClient
      .get("/recipes")
      .then((response) => {
        setRecipes(response.data);
        toast.success("Sikeres receptlekereses!");
      })
      .catch((error) => {
        toast.error(error?.message || "Error fetching recipes");
      })
      .finally(() => setIsLoading(false));
  }

  const filtered = useMemo(
    () =>
      recipes.filter(
        (r) =>
          r.name?.toLowerCase().includes(query.toLowerCase()) ||
          r.description?.toLowerCase().includes(query.toLowerCase())
      ),
    [recipes, query]
  );

  const formatIngredients = (raw?: string) => {
    if (!raw) return [];
    return raw
      .split(/\r?\n|,|;/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);
  };

  const generateCard = (r: Recipe) => {
    const imgSrc = r.imageUrl ? `${baseURL}/${r.imageUrl}` : "/placeholder-recipe.png";
    const ingredients = formatIngredients(r.ingredients);

    return (
      <Col key={r.id}>
        <Card
          className="recipe-card h-100"
          onClick={() => navigate(`/recipe/${r.id}`)}
          role="button"
          aria-label={`Open recipe ${r.name}`}
        >
          <div className="image-wrap">
            <Card.Img
              variant="top"
              src={imgSrc}
              alt={r.name || "recipe image"}
              className="recipe-img"
              loading="lazy"
            />
            <div className="card-overlay">
              <Button
                size="sm"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/recipe/${r.id}`);
                }}
              >
                Megtekintés
              </Button>
            </div>
          </div>

          <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className="mb-0 recipe-title">{r.name}</Card.Title>
              <Badge bg="secondary" className="time-badge">
                {r.cookTime ? `${r.cookTime} min` : "—"}
              </Badge>
            </div>

            <Card.Text className="flex-grow-1 text-muted small">{r.description}</Card.Text>

            <div className="ingredient-badges mb-2">
              {ingredients.map((ing, idx) => (
                <Badge key={idx} bg="light" text="dark" className="me-1 small badge-outline">
                  {ing}
                </Badge>
              ))}
            </div>

            <div className="d-flex gap-2 mt-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/recipe/${r.id}`);
                }}
                variant="success"
                size="sm"
              >
                Megtekintés
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit/${r.id}`);
                }}
                variant="outline-primary"
                size="sm"
              >
                Szerkesztés
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container className="py-4 allrecipes-page">
      <div className="top-controls d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 gap-2">
        <InputGroup className="search-wrap" style={{ maxWidth: 640 }}>
          <Form.Control
            placeholder="Keresés receptre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Keresés"
            className="search-input"
          />
          <Button variant="outline-secondary" onClick={() => setQuery("")} aria-label="Törlés keresés">
            Törlés
          </Button>
        </InputGroup>

        <div className="d-flex gap-2 mt-2 mt-md-0">
          <Button onClick={() => navigate("/recipe/new")} variant="primary">
            Új recept hozzáadása
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filtered.length ? (
            filtered.map((i) => generateCard(i))
          ) : (
            <Col key="no-results">
              <Card className="p-4 text-center">
                <Card.Body>
                  <Card.Title>Nincs találat</Card.Title>
                  <Card.Text>Próbáljon meg más keresőkifejezést vagy adjon hozzá egy új receptet.</Card.Text>
                  <Button variant="primary" onClick={() => navigate("/recipe/new")}>
                    Új recept
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default AllRecipes;
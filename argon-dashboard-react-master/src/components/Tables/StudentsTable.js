import { useState } from "react";
import {
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Input,
} from "reactstrap";

const TablesWithFilters = ({ students = [], actions = [] }) => {
    const [filters, setFilters] = useState({
        name: "",
        gender: "",
        age: "",
        education: "",
        academicYear: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const maxPageButtons = 5;

    // Actualizar filtros
    const handleFilterChange = (column, value) => {
        setFilters({ ...filters, [column]: value });
        setCurrentPage(1); // resetear a la primera página al filtrar
    };

    // Filtrar estudiantes
    const filteredStudents = students.filter((student) => {
        return (
            student.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            student.gender.toLowerCase().includes(filters.gender.toLowerCase()) &&
            student.age.toString().includes(filters.age) &&
            student.education.toLowerCase().includes(filters.education.toLowerCase()) &&
            student.academicYear.toString().includes(filters.academicYear)
        );
    });

    // Paginación
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Calcular rango de páginas visibles
    let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    let endPage = startPage + maxPageButtons - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }
    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) visiblePages.push(i);

    return (
        <>
            <Table responsive className="align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Education</th>
                        <th>Academic Year</th>
                        <th className="text-center">Actions</th>
                    </tr>
                    <tr>
                        {/* Inputs para filtrar */}
                        <th>
                            <Input
                                type="text"
                                placeholder="Search Name"
                                value={filters.name}
                                onChange={(e) => handleFilterChange("name", e.target.value)}
                            />
                        </th>
                        <th>
                            <Input
                                type="text"
                                placeholder="Search Gender"
                                value={filters.gender}
                                onChange={(e) => handleFilterChange("gender", e.target.value)}
                            />
                        </th>
                        <th>
                            <Input
                                type="text"
                                placeholder="Search Age"
                                value={filters.age}
                                onChange={(e) => handleFilterChange("age", e.target.value)}
                            />
                        </th>
                        <th>
                            <Input
                                type="text"
                                placeholder="Search Education"
                                value={filters.education}
                                onChange={(e) => handleFilterChange("education", e.target.value)}
                            />
                        </th>
                        <th>
                            <Input
                                type="text"
                                placeholder="Search Year"
                                value={filters.academicYear}
                                onChange={(e) => handleFilterChange("academicYear", e.target.value)}
                            />
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.length > 0 ? (
                        currentStudents.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.gender?.toLowerCase() === "f" ? "Female" : "Male"}</td>
                                <td>{student.age}</td>
                                <td>{student.education}</td>
                                <td>{student.academicYear}</td>
                                <td className="text-center">
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="md"
                                            color=""
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fas fa-ellipsis-v text-center" />
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            {actions.map((action, index) => (
                                                <DropdownItem key={index} onClick={() => action.func(student)}>
                                                    {action.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                                No students found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Paginación avanzada */}
            {totalPages > 1 && (
                <CardFooter className="py-4 d-flex justify-content-center border-0">
                    <nav aria-label="Pagination" className="w-100">
                        <Pagination className="pagination justify-content-center mb-0 flex-wrap">
                            {/* Primera página << */}
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink
                                    href="#first"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(1);
                                    }}
                                >
                                    &laquo;
                                </PaginationLink>
                            </PaginationItem>

                            {/* Página anterior < */}
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink
                                    href="#prev"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage - 1);
                                    }}
                                >
                                    &lt;
                                </PaginationLink>
                            </PaginationItem>

                            {/* Números visibles */}
                            {visiblePages.map((page) => (
                                <PaginationItem key={page} active={currentPage === page}>
                                    <PaginationLink
                                        href="#page"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page);
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {/* Página siguiente > */}
                            <PaginationItem disabled={currentPage === totalPages}>
                                <PaginationLink
                                    href="#next"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage + 1);
                                    }}
                                >
                                    &gt;
                                </PaginationLink>
                            </PaginationItem>

                            {/* Última página >> */}
                            <PaginationItem disabled={currentPage === totalPages}>
                                <PaginationLink
                                    href="#last"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(totalPages);
                                    }}
                                >
                                    &raquo;
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </nav>
                </CardFooter>
            )}
        </>
    );
};

export default TablesWithFilters;

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/hooks/use-toast"
import { getAllProjects } from "@/lib/api/project"
import { ProjectData } from "@/lib/types/project"
import { Label } from "@/components/ui/label"
import Footer from "../Footer/Footer"

export default function ProjectTable() {
    const [projects, setProjects] = React.useState<ProjectData[]>([])

    const columns: ColumnDef<ProjectData>[] = [
        {
            accessorKey: "title",
            header: "Project Title",
        },
        {
            accessorKey: "apiKey",
            header: () => <div className="text-right">API Key</div>,
            cell: ({ row }) => {
                const apiKey = row.getValue("apiKey") as string
                return (
                    <div className="flex items-center justify-end gap-2">
                        <span className="font-mono">{apiKey}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopy(apiKey)}
                            className="h-8 w-8 p-0"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast({
                title: "API Key copied to clipboard",
                duration: 2000,
            })
        } catch (error) {
            toast({
                title: "Failed to copy API Key",
                variant: "destructive",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            })
        }
    }

    const table = useReactTable({
        data: projects,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    React.useEffect(() => {
        const fetchProjects = async () => {
            const res = await getAllProjects()

            if (res?.status === 200) {
                setProjects(res.data)
            } else {
                toast({
                    title: `Error occurred: ${res}`,
                    variant: "destructive",
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                })
            }
        }
        fetchProjects()
    }, [])

    return (

        <div className="flex flex-col gap-8 mx-8 my-4">
            <div className="flex justify-between w-full items-center ml-5">
                {/* Title */}
                <div className="">
                    <Label className="font-bold md:text-5xl md:mx-14 text-4xl">API Keys</Label>
                </div>
            </div>
            <div className="w-full md:w-[80%] self-center">
                <div className="rounded-md border p-1">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No projects found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Footer />
        </div>
    )
}
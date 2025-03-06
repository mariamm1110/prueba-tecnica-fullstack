import { Context } from "@/types";
import { Enum_RoleName } from "@prisma/client";
import { GraphQLError } from "graphql";


export const userMutations = {
    updateUser: async (
        _: any,
        { id, name, role }: { id: string; name?: string; role?: string },
        { db, authData }: Context
    ) => {
        if (!authData || authData.role !== "ADMIN") {
            throw new Error("Not authorized");
        }

        let updateData: any = {};

        if (name) {
            updateData.name = name;
        }

        if (role) { //validar solo si se manda
            if (!Object.values(Enum_RoleName).includes(role as Enum_RoleName)) {
                throw new Error("Invalid role");
            }

            //encontrar el id del rol
            const roleRecord = await db.role.findUnique({ where: { name: role as Enum_RoleName } });
            if (!roleRecord) throw new Error("Role not found");

            updateData.role = { connect: { id: roleRecord.id } }; //linkea el role
            
        }

        return db.user.update({
            where: { id },
            data: updateData,
            include: { role: true }
        })
    },

    deleteUser: async (_: any, { id }: { id: string }, { db, authData }: Context) => {
        if (!authData || authData.role !== "ADMIN") {
            throw new Error("Not authorized");
        }

        const user = await db.user.findUnique({ where: { id } });
                if (!user) throw new GraphQLError("User not found");

        await db.user.delete({ where: { id } });

        return true;
    }
    
}
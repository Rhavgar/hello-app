<template>
  <v-data-table
  :headers="headers"
  :items="exoplanets"
  sort-by="id"
  class="elevation-1">

  <template v-slot:top>
    <v-toolbar flat>
      <v-toolbar-title>Exoplanets Catalog</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Novo Item
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle}}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                  v-model="editedItem.id"
                  label="ID">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                  v-model="editedItem.name"
                  label="Nome do Exoplaneta">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                  v-model="editedItem.lyearth"
                  label="Anos-luz da Terra">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                  v-model="editedItem.mass"
                  label="Massa">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                  v-model="editedItem.stellarmagnitude"
                  label="Magnetude Estrelar">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                  v-model="editedItem.year"
                  label="Ano de descoberta">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </template>
  <template v-slot:item.actions="{ item }">
    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
  </template>
  <template v-slot:no-data>
    <v-btn color="primary" @click="startAxios">Resetar</v-btn>
  </template>
</v-data-table>
</template>

<script>
import axios from "axios";
export default
{
  name: "ExoplanetCrud",

  data: () =>
  ({
    dialog: false,

    headers:
    [
      {
        text: "ID", value: "id"
      },
      {
        text: "Nome", value: "name"
      },
      {
        text: "Ano-luz da Terra", value: "lyearth"
      },
      {
        text: "Massa", value: "mass"
      },
      {
        text: "Magnetude Estrelar", value: "stellarmagnitude"
      },
      {
        text: "Ano de descoberta", value: "year"
      },
      {
        text: "Ações", value: "actions", sortable: false
      },
    ],

    exoplanets:
    [
      {
        id: 1,
        name: "16 Cygni B b",
        lyearth: 69,
        mass: "1,78 Jupiters",
        stellarmagnitude: 6.25,
        year: 1996
      },
    ],

    editedIndex: -1,

    editedItem:
    {
      id: 0,
      name: "",
      lyearth: 0,
      mass: "",
      stellarmagnitude: 0,
      year: 0,
    },

    defaultItem:
    {
      id: 0,
      name: "",
      lyearth: 0,
      mass: "",
      stellarmagnitude: 0,
      year: 0,
    },

  }),

  methods:
  {
    startAxios()
    {
      axios("http://localhost:3000/exoplanets")
      .then((response) => {
        this.exoplanets = response.data;
      })
      .catch((error) => console.log(error));
    },

    close()
    {
      this.dialog = false;
      setTimeout(() =>
      {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save()
    {
      if (this.editedIndex > -1)
      {
        axios
        .put("http://localhost:3000/exoplanets/" + this.editedIndex.id, this.editedItem)
        .then((response) =>
        {
          console.log(response);
          Object.assign(this.exoplanets[this.editedIndex], this.editedItem);
          this.close;
        })
        .catch((error) => console.log(error));
      } else
      {
        axios
        .post("http://localhost:3000/exoplanets", this.editedItem)
        .then((response) =>
      {
        console.log(response);
        this.exoplanets.push(this.editedItem);
        this.close();
      })
      .catch((error) => console.log(error));
      }
    },

    editItem(item)
    {
      this.editedIndex = this.exoplanets.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item)
    {
      const index = this.exoplanets.indexOf(item);
      confirm("Deseja apagar este item?") &&
        axios
          .delete("http://localhost:3000/exoplanets/" + item.id)
          .then((response) =>
          {
            console.log(response.data);
            this.exoplanets.splice(index, 1);
          })
          .catch((error) => console.log(error))
    }
  },

  computed:
  {
    formTitle()
    {
      return this.editedIndex == -1 ? "Novo Item" : "Editar Item";
    },
  },

  watch:
  {
    dialog(val)
    {
      val || this.close();
    },
    dialogDelete(val)
    {
      val || this.closeDelete();
    },
  },


  created()
  {
    this.startAxios();
  },

};
</script>

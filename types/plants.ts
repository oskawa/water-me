import { Context } from '@nuxt/types'
import { AxiosResponse } from 'axios'
import axios from 'axios'
import { Auth } from '@nuxtjs/auth-next'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface PlantData {
  id: number
  title: string
  content: string
  author: number
  frequency: number
  watering: Date
  photos?: Array<File>
}

export class Plant {
  private readonly auth: Auth
  private readonly $axios: NuxtAxiosInstance

  public data: PlantData | null = null

  constructor(auth: Auth, data: PlantData | null = null) {
    ;(this.auth = auth), (this.data = data)
  }

  static async getAll(auth: Auth): Promise<Plant[]> {
    const token = auth.strategy.token.get()
    const response: AxiosResponse = await axios.get(
      'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/plants',
      {
        params: { author: auth.user.id, status: 'publish' },
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    return response.data.map((data: PlantData) => new Plant(data))
  }

  static async getById(auth: Auth, id: number): Promise<Plant> {
    const token = auth.strategy.token.get()
    const response: AxiosResponse = await axios.get(
      `https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/plants/${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    return new Plant(response.data)
  }
  static async edit(
    auth: Auth,
    id_plant: number,
    data: PlantData,
  ): Promise<void> {
    const token = auth.strategy.token.get()

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    // formData.append('author', auth.user.id)
    // formData.append('status', 'publish')

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
    var photoIds = []
    if (data.photos.length > 0) {
      const photoPromises = Object.values(data.photos).map(async (photo) => {
        const photoFormData = new FormData()
        photoFormData.append('file', photo)

        const response = await axios.post(
          'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/media',
          photoFormData,
          config,
        )

        return response.data.id
      })

      photoIds = await Promise.all(photoPromises)
    }

    // Send the data to the WordPress API.
    await axios
      .post(
        'https://portfolio-maxime-back.maxime-eloir.fr//wp-json/wp/v2/plants/' +
          id_plant,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        var photoId = []
        response.data.acf.plant_img_repeater.forEach((element) => {
          photoId.push(element.id)
        })

        photoIds.forEach((id) => {
          photoId.push(id)
        })

        console.log(response)
        console.log(data.title)
        axios.post(
          'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/acf/v3/plants/' +
            response.data.id,
          {
            fields: {
              title: data.title,
              description: data.content,
              plant_img_repeater: photoId,
            },
          },
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type':
                'application/json; charset=UTF-8; application/x-www-form-urlencoded',
            },
          },
        )
      })

    // Create new plant
    // await axios.post(
    //   'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/plants',
    //   requestData,
    //   {
    //     headers: {
    //       Authorization: `${token}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   },
    // )
  }

  static async updateWatering(auth: Auth, id_plant: number, watering: Date) {
    const token = auth.strategy.token.get()
    axios.post(
      'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/acf/v3/plants/' +
        id_plant,
      {
        fields: {
          last_arrosage: watering,
          historique:{
            date_historique : watering
          }
        },
      },
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type':
            'application/json; charset=UTF-8; application/x-www-form-urlencoded',
        },
      },
    )
  }
  static async deleteImg(
    auth: Auth,
    id_plant: number,
    id_img: number,
  ): Promise<void> {
    const token = auth.strategy.token.get()

    try {
      await axios.delete(
        `https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/media/${id_img}?force=true`,
        {
          headers: {
            Authorization: token,
          },
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  static async save(auth: Auth, data: PlantData): Promise<void> {
    const token = auth.strategy.token.get()
    // const requestData = {
    //   title: data.title || '' ,
    //   content: data.content || '' ,
    //   author: auth.user.id,
    //   status:'publish'
    // }
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('author', auth.user.id)
    formData.append('status', 'publish')

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
    let photoIds = []
    if (data.photos) {
      const photoPromises = Object.values(data.photos).map(async (photo) => {
        const photoFormData = new FormData()
        photoFormData.append('file', photo)

        const response = await axios.post(
          'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/media',
          photoFormData,
          config,
        )

        return response.data.id
      })
      photoIds = await Promise.all(photoPromises)
    }

    let photoId = []
    photoIds.forEach((id) => {
      photoId.push(id)
    })

    // Send the data to the WordPress API.
    await axios
      .post(
        'https://portfolio-maxime-back.maxime-eloir.fr//wp-json/wp/v2/plants',
        formData,
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log(response)
        console.log(token)
        axios.post(
          'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/acf/v3/plants/' +
            response.data.id,
          {
            fields: {
              plant_img_repeater: photoId,
              title: data.title,
              description: data.content,
              frequency_arrosage: data.frequency,
              last_arrosage: data.watering,
            },
          },
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type':
                'application/json; charset=UTF-8; application/x-www-form-urlencoded',
            },
          },
        )
      })

    // Create new plant
    // await axios.post(
    //   'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/plants',
    //   requestData,
    //   {
    //     headers: {
    //       Authorization: `${token}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   },
    // )
  }

  async delete(): Promise<void> {
    if (this.data?.id) {
      await $auth.$axios.$delete(`/wp/v2/plants/${this.data.id}`)
    }
  }
}
